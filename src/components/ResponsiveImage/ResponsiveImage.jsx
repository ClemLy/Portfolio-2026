import imageManifest from '../../data/imageManifest.json';

/* Image responsive : sert AVIF puis WebP, dans la largeur la mieux adaptée
   à l'écran, à partir des variantes générées par `npm run optimize:images`.
   Le manifeste (imageManifest.json) est la seule source de vérité sur les
   fichiers réellement présents sur disque — si une image n'y figure pas
   encore (pas retraitée), on se rabat simplement sur le fichier tel quel,
   sans jamais référencer une variante qui n'existe pas.

   Important : le `sizes` passé doit refléter la largeur RÉELLE d'affichage.
   Si `sizes` annonce un emplacement plus large que la plus grande variante
   disponible, le navigateur agrandit cette variante pour remplir la place
   (et le rendu redevient flou) — ce n'est pas un bug, c'est le calcul de
   densité standard des images responsives. */
const ResponsiveImage = ({ src, alt, sizes = '100vw', className, loading = 'lazy', width, height, onLoad, ...rest }) => {
  const widths = imageManifest[src];

  if (!widths || widths.length === 0) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        onLoad={onLoad}
        {...rest}
      />
    );
  }

  const base = src.replace(/\.\w+$/, '');
  const avifSrcSet = widths.map((w) => `${base}-${w}.avif ${w}w`).join(', ');
  const webpSrcSet = widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
  const fallbackSrc = `${base}-${widths[widths.length - 1]}.webp`;

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        onLoad={onLoad}
        {...rest}
      />
    </picture>
  );
};

export default ResponsiveImage;
