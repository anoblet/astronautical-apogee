import dark from '@themes/dark.json';
import light from '@themes/light.json';

type Theme = Record<string, string>;
const presets: Record<string, Theme> = { dark, light };
const editable = new Set([
  'body-background-color',
  'text-color',
  'h1-color',
  'h1-font-size',
  'navigation-a-color',
]);
const subscribers = new Set<(theme: string) => void>();
let current: Theme | undefined;
const validValue = (name: string, value: unknown): value is string => {
  if (typeof value !== 'string' || !editable.has(name)) return false;
  return name === 'h1-font-size'
    ? /^(?:[1-9]\d?(?:\.\d+)?px|[1-5](?:\.\d+)?rem)$/.test(value)
    : /^#[\da-f]{6}$/i.test(value);
};

export const getTheme = (): Theme => {
  if (current) return { ...current };
  let stored: unknown;
  try {
    stored = JSON.parse(localStorage.getItem('theme') || 'null');
  } catch {
    /* Use the default when storage is unavailable or malformed. */
  }
  const record =
    stored && typeof stored === 'object'
      ? (stored as Record<string, unknown>)
      : {};
  const name = record.name === 'light' ? 'light' : 'dark';
  current = { ...presets[name] };
  for (const [key, value] of Object.entries(record)) {
    if (validValue(key, value)) current[key] = value;
  }
  return { ...current };
};

export const applyTheme = (theme: Theme, persist = true) => {
  const name = theme.name === 'light' ? 'light' : 'dark';
  const next = { ...presets[name] };
  for (const [key, value] of Object.entries(theme)) {
    if (validValue(key, value)) next[key] = value;
  }
  for (const key of new Set([
    ...Object.keys(dark),
    ...Object.keys(light),
    ...editable,
    'background-color',
  ])) {
    document.documentElement.style.removeProperty(`--${key}`);
  }
  for (const key of editable) {
    if (next[key] !== presets[name][key])
      document.documentElement.style.setProperty(`--${key}`, next[key]);
  }
  document.documentElement.dataset.theme = name;
  current = next;
  if (persist) {
    try {
      localStorage.setItem('theme', JSON.stringify(next));
    } catch {
      /* Settings still work for this visit. */
    }
  }
  subscribers.forEach(callback => callback(name));
};

export const applyStoredTheme = () => {
  current = undefined;
  applyTheme(getTheme(), false);
};
export const selectTheme = (name: 'light' | 'dark') =>
  applyTheme(presets[name]);
export const setProperty = (name: string, value: string) => {
  if (validValue(name, value.trim()))
    applyTheme({ ...getTheme(), [name]: value.trim() });
};
export const resetTheme = () => {
  try {
    localStorage.removeItem('theme');
  } catch {
    /* Reset also works without storage. */
  }
  applyTheme(dark, false);
};
export const subscribe = (callback: (theme: string) => void) => {
  subscribers.add(callback);
  callback(getTheme().name);
  return () => {
    subscribers.delete(callback);
  };
};
