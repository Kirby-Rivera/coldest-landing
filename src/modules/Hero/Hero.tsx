import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroMainRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroMainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      // // Animate the background to fill viewport
      // tl.to(heroBackgroundRef.current, {
      //   scale: 1.2,
      //   opacity: 1,
      //   duration: 0.5,
      // });

      // Animate the content container to become navbar-sized
      tl.to(
        heroContentRef.current,
        {
          width: "100%",
          height: "100%",
          padding: "0",
          duration: 1,
        },
        0,
      );

      // Animate the logo to become small
      tl.to(
        logoRef.current,
        {
          fontSize: "1.5rem",
          duration: 1,
        },
        0,
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="hero">
        <div className={styles["hero-main"]} ref={heroMainRef}>
          <div className={styles["hero-background"]} ref={heroBackgroundRef}>
            <img src="/hero-bg.jpg" alt="" />
          </div>
          <div className={styles["hero-content"]} ref={heroContentRef}>
            <div className={styles["hero-navs"]}>
              <nav>
                <ul>
                  <li>Home</li>
                  <li>Product</li>
                </ul>
                <ul>
                  <li>History</li>
                  <li>Contact</li>
                </ul>
              </nav>
            </div>
            <h1 ref={logoRef} className="font-black text-9xl tracking-tighter">
              COLDEST
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
