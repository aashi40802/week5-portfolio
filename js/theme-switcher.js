/* ==========================================================================
   theme-switcher.js
   Toggles between light and dark themes by adding/removing the
   `theme-dark` class on <body>. All the colors themselves live in
   CSS variables (main.css), so this file only flips one class.

   Note: this project runs on GitHub Pages where localStorage works fine,
   and normally we'd persist the choice there. It's left out here to keep
   the demo self-contained; the toggle applies for the current session.
   ========================================================================== */

const toggleButton = document.getElementById("themeToggle");

/**
 * Apply a theme and keep the button's accessible state in sync.
 * @param {boolean} isDark - true for dark mode, false for light.
 */
function applyTheme(isDark) {
  document.body.classList.toggle("theme-dark", isDark);

  // Screen readers announce the *next* action the button performs.
  toggleButton.setAttribute("aria-pressed", String(isDark));
  toggleButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

// Start in light mode, then flip on each click.
let darkMode = false;

toggleButton.addEventListener("click", () => {
  darkMode = !darkMode;
  applyTheme(darkMode);
});
