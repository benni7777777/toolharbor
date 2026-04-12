const THEME_KEY = 'opentoolskit-extension-theme';

function resolveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return theme;
}

function applyTheme(theme) {
  const resolvedTheme = resolveTheme(theme);
  document.body.dataset.theme = resolvedTheme;

  document.querySelectorAll('.theme-chip').forEach((button) => {
    button.classList.toggle('active', button.dataset.theme === theme);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'system';
  applyTheme(savedTheme);

  document.querySelectorAll('.theme-chip').forEach((button) => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme || 'system';
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
    });
  });

  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      chrome.tabs.create({ url: link.href });
      window.close();
    });
  });
});
