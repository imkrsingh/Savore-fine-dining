"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollEffects() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  /* ─────────────────────────────────────────────────────────
     EFFECT 1 — Once: cursor, noise, scroll progress, header
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    /* Cursor dot */
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dotRef.current = dot;
    document.body.appendChild(dot);

    /* Cursor ring */
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    ringRef.current = ring;
    document.body.appendChild(ring);

    /* Noise overlay */
    const noise = document.createElement("div");
    noise.className = "noise-overlay";
    noise.setAttribute("aria-hidden", "true");
    document.body.appendChild(noise);

    /* Progress bar */
    const progress = document.createElement("div");
    progress.className = "site-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.prepend(progress);
    progressRef.current = progress;

    /* Mouse move */
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMouseMove);

    /* Ring lag animation */
    const animateRing = () => {
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;
      ring.style.left = ringPosRef.current.x + "px";
      ring.style.top = ringPosRef.current.y + "px";
      rafRef.current = requestAnimationFrame(animateRing);
    };
    animateRing();

    /* Scroll: progress + header compact */
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
          if (progressRef.current)
            progressRef.current.style.transform = `scaleX(${Math.min(pct, 1)})`;
          document
            .querySelector(".site-header")
            ?.classList.toggle("is-compact", window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      dot.remove();
      ring.remove();
      noise.remove();
      progress.remove();
    };
  }, []);

  /* ─────────────────────────────────────────────────────────
     EFFECT 2 — Per route: all page-level animations
     Runs every pathname change (Next.js SPA navigation)
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Parallax scroll listener ref so we can remove it on cleanup */
    let parallaxHandler: (() => void) | null = null;

    const timer = setTimeout(() => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      /* ── Cursor hover re-attach ── */
      if (dot && ring) {
        document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
          el.addEventListener("mouseenter", () => {
            dot.classList.add("is-hovering");
            ring.classList.add("is-hovering");
          });
          el.addEventListener("mouseleave", () => {
            dot.classList.remove("is-hovering");
            ring.classList.remove("is-hovering");
          });
        });

        /* Dark section cursor colour swap */
        document.querySelectorAll("[data-dark]").forEach((section) => {
          new IntersectionObserver(
            (entries) =>
              entries.forEach((e) => {
                dot.classList.toggle("on-dark", e.isIntersecting);
                ring.classList.toggle("on-dark", e.isIntersecting);
              }),
            { threshold: 0.5 }
          ).observe(section);
        });
      }

      /* ── Split text (guard double-split) ── */
      document.querySelectorAll("[data-split]").forEach((el) => {
        if (el.classList.contains("split-text")) return;
        const text = el.textContent || "";
        let charIndex = 0;
        el.innerHTML = text
          .split(" ")
          .map((word) => {
            const chars = word
              .split("")
              .map((char) => {
                const s = `<span class="char" style="--char-index:${charIndex}">${char}</span>`;
                charIndex++;
                return s;
              })
              .join("");
            return `<span class="word">${chars}</span>`;
          })
          .join(" ");
        el.classList.add("split-text");
      });

      /* ── Intersection observer: reveal + split text ── */
      const targets = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale, .clip-reveal, .split-text, .section-line, [data-reveal]"
      );

      if (prefersReduced) {
        targets.forEach((el) => el.classList.add("is-visible"));
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              const delay = parseInt(el.dataset.delay || "0");
              setTimeout(() => el.classList.add("is-visible"), delay);
              io.unobserve(el);
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
        );
        targets.forEach((el) => io.observe(el));
      }

      /* ── Parallax ── */
      if (!prefersReduced) {
        const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
        parallaxHandler = () => {
          parallaxEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const speed = parseFloat(el.dataset.parallax || "0.08");
            const shift = (rect.top - window.innerHeight / 2) * speed;
            el.style.transform = `translateY(${shift}px) scale(1.05)`;
          });
        };
        window.addEventListener("scroll", parallaxHandler, { passive: true });
        parallaxHandler();
      }

      /* ── Magnetic buttons ── */
      if (!prefersReduced) {
        document.querySelectorAll<HTMLElement>(".btn-magnetic").forEach((btn) => {
          btn.addEventListener("mousemove", (e) => {
            const r = btn.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) * 0.3;
            const y = (e.clientY - r.top - r.height / 2) * 0.3;
            btn.style.transform = `translate(${x}px, ${y}px)`;
          });
          btn.addEventListener("mouseleave", () => {
            btn.style.transform = "";
          });
        });
      }

      /* ── Card 3D tilt ── */
      if (!prefersReduced) {
        document.querySelectorAll<HTMLElement>(".card-tilt").forEach((card) => {
          card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
            const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
            card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
          });
          card.addEventListener("mouseleave", () => {
            card.style.transform = "";
          });
        });
      }

      /* ── Animated counters ── */
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        // Reset to 0 on each route visit
        el.textContent = (el.dataset.prefix || "") + "0" + (el.dataset.suffix || "");

        const counterObs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              counterObs.unobserve(entry.target);

              const target = parseFloat(el.dataset.count || "0");
              const suffix = el.dataset.suffix || "";
              const prefix = el.dataset.prefix || "";
              const duration = 2000;
              const startTime = performance.now();

              const tick = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quart
                const ease = 1 - Math.pow(1 - progress, 4);
                const current = target * ease;
                el.textContent =
                  prefix +
                  (Number.isInteger(target)
                    ? Math.floor(current).toString()
                    : current.toFixed(1)) +
                  suffix;
                if (progress < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            });
          },
          { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }
        );
        counterObs.observe(el);
      });

    }, 80);

    /* Cleanup: clear timer + parallax listener */
    return () => {
      clearTimeout(timer);
      if (parallaxHandler) {
        window.removeEventListener("scroll", parallaxHandler);
      }
    };
  }, [pathname]);

  return null;
}
