import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const registerGSAPPlugins = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
};

/**
 * Creates a text reveal timeline (simulates SplitText which is premium)
 * Assumes the element contains words wrapped in spans
 */
export const createTextRevealTimeline = (element: HTMLElement | null, options = {}) => {
  if (!element) return gsap.timeline();
  
  // Basic fallback for text reveal without premium SplitText plugin
  const children = element.children;
  if (children.length === 0) return gsap.timeline();

  return gsap.timeline(options).fromTo(
    children,
    { y: "100%", opacity: 0 },
    { y: "0%", opacity: 1, ease: "power4.out", stagger: 0.05, duration: 1 }
  );
};

/**
 * Creates a fade in animation triggered on scroll
 */
export const createScrollFadeIn = (element: HTMLElement | null, options: any = {}) => {
  if (!element) return;

  const { start = "top 80%", y = 40, duration = 0.8, stagger = 0 } = options;

  return gsap.fromTo(
    element,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

/**
 * Creates an infinite marquee animation
 */
export const createMarquee = (container: HTMLElement | null, options: any = {}) => {
  if (!container) return;
  const { duration = 20, direction = -1 } = options;
  
  return gsap.to(container, {
    xPercent: direction * 50,
    ease: "none",
    duration,
    repeat: -1,
  });
};

/**
 * Creates a count up animation for numbers
 */
export const createCounterAnimation = (element: HTMLElement | null, target: number, duration = 2) => {
  if (!element) return;
  
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      if (element) {
        element.innerHTML = Math.floor(obj.val).toString();
      }
    },
    snap: { val: 1 },
  });
};

/**
 * Creates a parallax floating effect
 */
export const createParallaxFloat = (element: HTMLElement | null, options: any = {}) => {
  if (!element) return;
  const { y = 15, duration = 3 } = options;
  
  return gsap.to(element, {
    y: `+=${y}`,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
};

/**
 * Error shake animation
 */
export const createShakeAnimation = (element: HTMLElement | null) => {
  if (!element) return;
  return gsap.to(element, {
    x: -10,
    duration: 0.05,
    repeat: 5,
    yoyo: true,
    clearProps: "x"
  });
};

/**
 * Seat selection bounce
 */
export const createSeatSelectBounce = (element: HTMLElement | null) => {
  if (!element) return;
  return gsap.fromTo(
    element,
    { scale: 1 },
    { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: "back.out(1.7)" }
  );
};
