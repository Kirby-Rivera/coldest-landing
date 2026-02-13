import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/src/SplitText";

const useAnimateHero = () => {
  const heroMainRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = new SplitText(logoRef.current, { type: "chars" });

    gsap.from(split.chars, {
      opacity: 0,
      x: -50,  // Changed from y to x, negative for left
      stagger: 0.05,
      duration: 0.8,
      ease: "power2.out"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroMainRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    tl.to(
      heroContentRef.current,
      {
        width: "100%",
        height: "100%",
        padding: "0",
        duration: 1,
      },
      0
    );

    tl.to(
      logoRef.current,
      {
        fontSize: "2rem",
        y: "-94.5vh",
        marginTop: 0,
        duration: 1,
      },
      0
    );

    tl.fromTo(
      contentRef.current,
      {
        opacity: 0,
        visibility: "hidden",
        y: 50,
        display: "none",
      },
      {
        display: "flex",
        y: 0,
        visibility: "visible",
        opacity: 1,
        duration: 1,
      },
      1
    );
  }, []);

  return {
    heroMainRef,
    heroContentRef,
    heroBackgroundRef,
    logoRef,
    contentRef,
  };
};

export default useAnimateHero;
