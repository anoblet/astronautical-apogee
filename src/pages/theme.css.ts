import type { APIRoute } from 'astro';
import dark from '../themes/dark.json';
import light from '../themes/light.json';
export const GET: APIRoute = () => {
  const css = Object.entries({ dark, light })
    .map(([name, properties]) => {
      const selector =
        name === 'dark'
          ? ':root, :root[data-theme="dark"]'
          : ':root[data-theme="light"]';
      const tokens = Object.entries(properties)
        .filter(([key, value]) => key !== 'name' && value)
        .map(([key, value]) => `--${key}:${value};`)
        .join('');
      return `${selector}{${tokens}color-scheme:${name};}`;
    })
    .join('\n');
  return new Response(css, { headers: { 'Content-Type': 'text/css' } });
};
