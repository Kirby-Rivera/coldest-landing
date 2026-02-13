import useAnimateHero from "./useAnimateHero";
import styles from "./Hero.module.scss";

const Hero = () => {
  const {
    heroMainRef,
    heroContentRef,
    heroBackgroundRef,
    logoRef,
    contentRef,
  } = useAnimateHero();

  return (
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
            </nav>
            <nav>
              <ul>
                <li>History</li>
                <li>Contact</li>
              </ul>
            </nav>
          </div>

          <div ref={contentRef} className={styles["content-grid"]}>
            <div className={styles["content-left"]}>
              <p className="text-xl font-medium">Too Cool for Weird Kids.</p>
            </div>
            <div className={styles["content-right"]}>
              <p className="text-4xl mb-6  max-w-sm test">
                Lorem ipsum dolor sit amet, consectetur{" "}
                <span className="bg-black text-white px-1">
                  adipiscing elit.
                </span>{" "}
                Morbi consequat ex ac.
              </p>
              <p className="text-4xl max-w-sm">
                Lorem ipsum dolor sit amet, consectetur{" "}
                <span className="bg-black text-white px-1">
                  adipiscing elit.
                </span>{" "}
                Maecenas id semper urna, at varius turpis. Proin id.
              </p>
            </div>
          </div>

          <h1 ref={logoRef}>
            COLDEST
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
