import dark from '@themes/dark.json' assert { type: 'json' };
import light from '@themes/light.json' assert { type: 'json' };

const setProperty = (name: string, value: string) => {
  document.documentElement.style.setProperty(`--${name}`, value.trim());
};

const setProperties = (properties: Record<string, string>) => {
  for (const [name, value] of Object.entries(properties)) {
    setProperty(name, value);
  }
};

const subscribers: Array<(theme: string) => void> = [];

export const applyStoredTheme = () => {
  applyTheme(getTheme());
};

export const applyTheme = (theme: Record<string, string>) => {
  document.documentElement.setAttribute('data-theme', theme.name);
  for (const [name, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty(`--${name}`, value.trim());
  }
  subscribers.forEach(callback => {
    callback(theme.name);
  });
};

export const getTheme = (): Record<string, string> => {
  let theme;
  const storedTheme = window.localStorage.getItem('theme');
  if (storedTheme) {
    const name = JSON.parse(storedTheme).name;
    switch (name) {
      case 'dark':
        theme = dark;
        break;
      case 'light':
        theme = light;
        break;
      default:
        theme = dark;
    }
  } else {
    theme = dark;
  }
  return theme;
};

export const resetTheme = () => {
  window.localStorage.removeItem('theme');
  setProperties(light);
};

export const subscribe = (callback: (theme: string) => void) => {
  subscribers.push(callback);
  callback(getTheme().name);
};
