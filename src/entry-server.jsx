import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

const streamToString = async (stream) => {
  const decoder = new TextDecoder();
  let html = '';
  for await (const chunk of stream) html += decoder.decode(chunk, { stream: true });
  return html + decoder.decode();
};

export const render = async (url) => {
  const helmetContext = {};
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  const html = await streamToString(prelude);
  return { html, helmet: helmetContext.helmet };
};
