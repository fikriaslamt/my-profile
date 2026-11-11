type ThemeMode = "system" | "light" | "dark";

const STORAGE_KEY = "theme";
const MODES: ThemeMode[] = ["system", "light", "dark"];
const LABELS: Record<ThemeMode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const normalize = (value: unknown): ThemeMode =>
  MODES.includes(value as ThemeMode) ? (value as ThemeMode) : "light";

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
  const menu = themeRoot.querySelector<HTMLElement>("[data-theme-menu]");
  const options = Array.from(
    themeRoot.querySelectorAll<HTMLButtonElement>("[data-theme-option]"),
  );
  if (!toggle || !menu) return;

  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let transitionTimer: number | undefined;

  const updateAria = (mode: ThemeMode) => {
    options.forEach((option) => {
      option.setAttribute("aria-checked", String(option.dataset.themeOption === mode));
    });

    const label = LABELS[mode];
    toggle.setAttribute("aria-label", `Change theme (current: ${label})`);
    toggle.setAttribute("title", `Theme: ${label}`);
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

    const resolved =
      nextMode === "system" ? (colorSchemeQuery.matches ? "dark" : "light") : nextMode;

    root.dataset.theme = resolved;
    root.dataset.themeMode = nextMode;
    root.style.colorScheme = resolved;

    if (meta) {
      meta.setAttribute("content", resolved === "dark" ? "#0a0a0a" : "#ffffff");
    }

    updateAria(nextMode);
  };

  const items = () => Array.from(menu.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'));

  const openMenu = (position?: "first" | "last") => {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");

    const list = items();
    const checkedIndex = list.findIndex(
      (item) => item.getAttribute("aria-checked") === "true",
    );
    let index = checkedIndex >= 0 ? checkedIndex : 0;
    if (position === "first") index = 0;
    if (position === "last") index = list.length - 1;

    window.requestAnimationFrame(() => list[index]?.focus());
  };

  const closeMenu = (focusToggle = true) => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    if (focusToggle) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    if (menu.hidden) openMenu();
    else closeMenu();
  });

  toggle.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu("first");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu("last");
    }
  });

  menu.addEventListener("keydown", (event) => {
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLButtonElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      list[(index + 1) % list.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      list[(index - 1 + list.length) % list.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      list[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      list[list.length - 1]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    } else if (event.key === "Tab") {
      closeMenu(false);
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      apply(option.dataset.themeOption, { persist: true, animate: true });
      closeMenu();
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!menu.hidden && !themeRoot.contains(event.target as Node)) closeMenu(false);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      apply(read(), { persist: false, animate: true });
    }
  });

  colorSchemeQuery.addEventListener("change", () => {
    if (read() === "system") apply("system", { persist: false, animate: true });
  });

  apply(read(), { persist: false, animate: false });
};
