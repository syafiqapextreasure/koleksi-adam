import { useEffect } from "react";
import { useRouter } from "next/router";
import "@fontsource-variable/plus-jakarta-sans/index.css";
import "../styles/site.css";
import "../styles/reference.css";
import "../styles/carousels.css";
import "../styles/responsive.css";

export default function App({ Component, pageProps }) {
  const { events } = useRouter();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let hero;
    let entry;
    function positionHero() {
      frame = 0;
      if (!hero || preference.matches) return;
      const bounds = hero.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      const offset = Math.max(0, Math.min(-bounds.top * 0.12, bounds.height * 0.075));
      hero.style.setProperty("--parallax-offset", offset + "px");
    }
    function schedule() {
      if (hero && !preference.matches && !frame) frame = requestAnimationFrame(positionHero);
    }
    function locateHero() {
      hero = document.querySelector("header.hero");
      schedule();
    }
    function onRouteComplete(url, { shallow }) {
      if (shallow) return;
      locateHero();
      const main = document.querySelector("main");
      if (main && !preference.matches) {
        entry?.cancel();
        entry = main.animate(
          [{ opacity: 0.75, transform: "translateY(5px)" }, { opacity: 1, transform: "none" }],
          { duration: 220, easing: "ease-out" }
        );
      }
    }
    function motionChanged() {
      if (preference.matches) entry?.cancel();
      schedule();
    }
    locateHero();
    events.on("routeChangeComplete", onRouteComplete);
    window.addEventListener("scroll", schedule, { passive: true });
    preference.addEventListener("change", motionChanged);
    return () => {
      events.off("routeChangeComplete", onRouteComplete);
      window.removeEventListener("scroll", schedule);
      preference.removeEventListener("change", motionChanged);
      cancelAnimationFrame(frame);
      entry?.cancel();
    };
  }, [events]);
  return <Component {...pageProps} />;
}
