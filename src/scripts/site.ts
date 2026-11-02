/* Navigation sheet, sticky header state, scroll reveals, and active section links. */

const header = document.querySelector<HTMLElement>("[data-site-header]");
const navToggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const mobileNav = document.getElementById("mobile-nav");

if (navToggle && mobileNav) {
  const setOpen = (open: boolean) => {
    mobileNav.hidden = !open;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  navToggle.addEventListener("click", () => setOpen(mobileNav.hidden));
  mobileNav
    .querySelectorAll<HTMLAnchorElement>("[data-nav-link]")
    .forEach((link) => link.addEventListener("click", () => setOpen(false)));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) {
      setOpen(false);
      navToggle.focus();
    }
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

if (header) {
  const setScrolled = () => {
    header.dataset.scrolled = String(window.scrollY > 8);
  };
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });
}

const revealNodes = document.querySelectorAll<HTMLElement>(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  revealNodes.forEach((node) => revealObserver.observe(node));
}

const sections = Array.from(
  document.querySelectorAll<HTMLElement>("main section[id]"),
);
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));

const setActive = (id: string) => {
  navLinks.forEach((link) => {
    if (link.hash === `#${id}`) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
};

if (sections.length && navLinks.length && "IntersectionObserver" in window) {
  const ratios = new Map<string, number>();

  const pickActive = () => {
    let best = "";
    let bestRatio = 0;
    ratios.forEach((ratio, id) => {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        best = id;
      }
    });
    if (best) setActive(best);
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });
      pickActive();
    },
    { rootMargin: "-38% 0px -52% 0px", threshold: [0, 0.2, 0.5, 1] },
  );

  sections.forEach((section) => sectionObserver.observe(section));

  window.addEventListener(
    "scroll",
    () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActive(sections[sections.length - 1].id);
      else if (window.scrollY < 40) setActive(sections[0].id);
    },
    { passive: true },
  );
}

document.querySelectorAll<HTMLElement>("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
