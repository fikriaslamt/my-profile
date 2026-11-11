type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme";
const LABELS: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
};

const normalize = (value: unknown): ThemeMode =>
  value === "dark" ? "dark" : "light";

const read = (): ThemeMode => {
  try {
    return normalize(localStorage.getItem(STORAGE_KEY));
  } catch {
    return "light";
  }
};

const store = (mode: ThemeMode) => {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* storage unavailable — the choice lasts for this page only */
  }
};

export const initThemeToggle = () => {
  const themeRoot = document.querySelector<HTMLElement>("[data-theme-root]");
  if (!themeRoot) return;

  const toggle = themeRoot.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  if (!toggle) return;

  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let transitionTimer: number | undefined;

  const updateAria = (mode: ThemeMode) => {
    toggle.setAttribute("aria-label", `Switch theme (current: ${LABELS[mode]})`);
    toggle.setAttribute("title", `Theme: ${LABELS[mode]}`);
  };

  const apply = (mode: unknown, { persist = false, animate = true } = {}) => {
    const nextMode = normalize(mode);
    if (persist) store(nextMode);

    if (animate && !reducedMotion.matches) {
      root.classList.remove("theme-loading");
      root.classList.add("theme-transition");
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 220);
    }

    root.dataset.theme = nextMode;
    root.dataset.themeMode = nextMode;
    root.style.colorScheme = nextMode;

    if (meta) {
      meta.setAttribute("content", nextMode === "dark" ? "#0a0a0a" : "#ffffff");
    }

    updateAria(nextMode);
  };

  toggle.addEventListener("click", () => {
    apply(read() === "dark" ? "light" : "dark", { persist: true, animate: true });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      apply(read(), { persist: false, animate: true });
    }
  });

  apply(read(), { persist: false, animate: false });
};
