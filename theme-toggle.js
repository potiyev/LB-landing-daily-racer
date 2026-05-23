(function () {
  'use strict';

  var STORAGE_KEY = 'loopbreak-theme';
  var root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage may be unavailable (private mode); fail silently
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    // aria-pressed reflects "light mode is active"
    var lightActive = theme === 'light';
    btn.setAttribute('aria-pressed', lightActive ? 'true' : 'false');
    var icon = btn.querySelector('.theme-toggle-icon');
    var label = btn.querySelector('.theme-toggle-label');
    if (icon) icon.textContent = lightActive ? '☾' : '☀';
    if (label) label.textContent = 'Light mode';
  }

  // Apply stored or default theme ASAP to prevent FOUC.
  // Default to dark — that's the authentic retro look. Only honor an
  // explicit user choice from a previous visit; ignore system preference.
  var stored = getStoredTheme();
  var initial = stored === 'light' ? 'light' : 'dark';
  root.setAttribute('data-theme', initial);

  function init() {
    applyTheme(initial);
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
