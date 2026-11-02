const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    navigation.classList.remove("is-open");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const scheduleTrack = document.querySelector("#schedule-track");
const scheduleCurrent = document.querySelector("#schedule-current");

if (scheduleTrack && scheduleCurrent) {
  const scheduleSlides = [...scheduleTrack.querySelectorAll(".schedule-slide")];

  document.querySelectorAll("[data-schedule-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentIndex = Math.round(scheduleTrack.scrollLeft / scheduleTrack.clientWidth);
      const direction = Number(button.dataset.scheduleDirection);
      const nextIndex = (currentIndex + direction + scheduleSlides.length) % scheduleSlides.length;

      scheduleSlides[nextIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    });
  });

  scheduleTrack.addEventListener("scroll", () => {
    const currentIndex = Math.round(scheduleTrack.scrollLeft / scheduleTrack.clientWidth);
    scheduleCurrent.textContent = String(currentIndex + 1);
  }, { passive: true });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  document.body.classList.add("page-loaded");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    document.querySelectorAll(".about, .schedule, .courses, .guests, .location, .site-footer")
      .forEach((section) => {
        section.classList.add("scroll-reveal");
        revealObserver.observe(section);
      });
  }
}
