import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useAnimateHero = () => {
  const heroMainRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Add this ref for the lorem ipsum content

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroMainRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    // Animate the content container to become navbar-sized
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

    // Animate the logo to become small
    tl.to(
      logoRef.current,
      {
        fontSize: "2rem",
        y: "-95.5vh",
        marginTop: 0,
        duration: 1,
      },
      0
    );

    // Show content after animations finish
    tl.fromTo(
      contentRef.current,
      {
        opacity: 0,
        visibility: "hidden",
        y: 50,
        display: "none",
      },
      {
        display: "flex", // Changed to flex to match your CSS
        y: 0, // Slide to original position
        visibility: "visible",
        opacity: 1,
        duration: 2,
      },
      1
    );
  }, []);

  return {
    heroMainRef,
    heroContentRef,
    heroBackgroundRef,
    logoRef,
    contentRef, // Export the new ref
  };
};

export default useAnimateHero;
