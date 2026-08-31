import { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Clock,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three';
import { usePreferences } from '../../context/preferencesContext';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import imageManifest from '../../data/imageManifest.json';
import styles from './DistortedImage.module.css';

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/* Au repos : image légèrement désaturée et assombrie. Au survol : elle
   reprend sa couleur pleine et se déforme en ondulation qui suit le
   curseur, avec une pointe d'aberration chromatique sur la crête de
   l'onde — un aller-retour "endormie / vivante" plutôt qu'une simple
   distorsion continue. */
const FRAGMENT = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uCoverScale;
  varying vec2 vUv;

  void main() {
    vec2 uv = (vUv - 0.5) * uCoverScale + 0.5;
    vec2 toMouse = uv - uMouse;
    float dist = length(toMouse);
    float falloff = smoothstep(0.5, 0.0, dist);
    float ripple = sin(dist * 22.0 - uTime * 4.0) * 0.014 * uHover * falloff;
    vec2 dir = dist > 0.0001 ? toMouse / dist : vec2(0.0);
    vec2 duv = uv + dir * ripple;

    float aberration = ripple * 1.6;
    float r = texture2D(uTexture, duv + dir * aberration).r;
    float g = texture2D(uTexture, duv).g;
    float b = texture2D(uTexture, duv - dir * aberration).b;
    vec3 color = vec3(r, g, b);

    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    vec3 gray = vec3(luma);
    float sat = mix(0.1, 1.0, uHover);
    vec3 finalColor = mix(gray, color, sat);
    finalColor = mix(finalColor * 0.78, finalColor, uHover);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

/* Réutilise la variante déjà générée la plus proche de 800px plutôt que le
   fichier canonique (~1200px) : bien assez net pour la taille d'affichage
   d'une vignette, sans charger une texture GPU inutilement lourde. */
const pickTextureSrc = (src) => {
  const widths = imageManifest[src]?.widths;
  if (!widths || widths.length === 0) return src;
  const target = widths.find((w) => w >= 800) || widths[widths.length - 1];
  return `${src.replace(/\.\w+$/, '')}-${target}.webp`;
};

/* Vignette projet avec distorsion WebGL au survol. Se dégrade sans bruit
   vers une simple image (ResponsiveImage, toujours rendue en dessous) si
   le mouvement réduit est activé, si WebGL est indisponible, ou tant que
   la texture n'a pas fini de charger. */
const DistortedImage = ({ src, alt, className, sizes, loading = 'lazy', onLoad, width, height }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { reducedMotion } = usePreferences();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    let renderer;
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new Scene();
    const camera = new Camera();

    const uniforms = {
      uTexture: { value: null },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uCoverScale: { value: new Vector2(1, 1) },
    };

    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({ uniforms, vertexShader: VERTEX, fragmentShader: FRAGMENT, transparent: true });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const resize = (texture) => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);

      const img = texture?.image;
      if (img?.width) {
        const containerAspect = clientWidth / clientHeight;
        const imageAspect = img.width / img.height;
        if (imageAspect > containerAspect) {
          uniforms.uCoverScale.value.set(containerAspect / imageAspect, 1);
        } else {
          uniforms.uCoverScale.value.set(1, imageAspect / containerAspect);
        }
      }
    };

    const textureLoader = new TextureLoader();
    let disposed = false;
    const texture = textureLoader.load(pickTextureSrc(src), (loaded) => {
      if (disposed) return;
      loaded.colorSpace = SRGBColorSpace;
      uniforms.uTexture.value = loaded;
      resize(loaded);
      setReady(true);
    });

    const ro = new ResizeObserver(() => resize(uniforms.uTexture.value));
    ro.observe(container);

    const state = { hover: 0, hoverTarget: 0, mouse: new Vector2(0.5, 0.5), mouseTarget: new Vector2(0.5, 0.5) };

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      state.mouseTarget.set((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height);
    };
    const handlePointerEnter = () => {
      state.hoverTarget = 1;
    };
    const handlePointerLeave = () => {
      state.hoverTarget = 0;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointerleave', handlePointerLeave);

    const clock = new Clock();
    let raf;
    const animate = () => {
      state.hover += (state.hoverTarget - state.hover) * 0.08;
      state.mouse.lerp(state.mouseTarget, 0.15);
      uniforms.uHover.value = state.hover;
      uniforms.uMouse.value.copy(state.mouse);
      uniforms.uTime.value = clock.getElapsedTime();
      if (uniforms.uTexture.value) renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [src, reducedMotion]);

  return (
    <span ref={containerRef} className={styles.wrap}>
      <ResponsiveImage
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        sizes={sizes}
        className={`${styles.fallbackImg} ${className || ''}`}
        onLoad={onLoad}
      />
      {!reducedMotion && (
        <canvas ref={canvasRef} className={`${styles.canvas} ${ready ? styles.canvasReady : ''}`} aria-hidden="true" />
      )}
    </span>
  );
};

export default DistortedImage;
