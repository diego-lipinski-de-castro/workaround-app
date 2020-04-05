import store from "@/store";

const updateTheme = theme => store.dispatch("app/setTheme", theme);

const prefersDark = event => {
  const isDark = event.matches;

  updateTheme(isDark ? "dark" : "light");
};

const initThemeHandler = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isLightMode = window.matchMedia("(prefers-color-scheme: light)")
    .matches;

  const isNotSpecified = window.matchMedia(
    "(prefers-color-scheme: no-preference)"
  ).matches;

  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

  if (isDarkMode) {
    updateTheme("dark");
  }

  if (isLightMode || isNotSpecified) {
    updateTheme("light");
  }

  if (hasNoSupport) {
    const hourOfDay = new Date().getHours();

    if (hourOfDay > 19 && hourOfDay < 6) {
      updateTheme("dark");
    } else {
      updateTheme("light");
    }
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", prefersDark);
};

const destroyThemeHandler = () => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .removeEventListener("change", prefersDark);
};

// TODO: On safari addEventListener is addListener
export { initThemeHandler, destroyThemeHandler };
