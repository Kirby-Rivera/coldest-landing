import useAnimateHero from "./useAnimateHero";
import styles from "./Hero.module.scss";
import clsx from "clsx";
import Copy from "@/components/BlockSlide";
import ShuffleRoulette from "@/components/ShuffleRoulette";

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
                <ShuffleRoulette>Home</ShuffleRoulette>
                <ShuffleRoulette>Product</ShuffleRoulette>
              </ul>
            </nav>
            <nav>
              <ul>
                <ShuffleRoulette>About</ShuffleRoulette>
                <ShuffleRoulette>Contact</ShuffleRoulette>
              </ul>
            </nav>
          </div>

          <div ref={contentRef} className={styles["content-grid"]}>
            <div className={styles["content-left"]}>
              <Copy delay={2} blockColor="#040730">
                <p className="text-xl font-medium tagline">
                  Too Cool for Weird Kids.
                </p>
              </Copy>
            </div>
            <Copy blockColor="#040730">
              <div className={clsx(styles["content-right"], "main-tagline")}>
                <p className="text-4xl max-w-sm test text-right mb-6">
                  Lorem ipsum dolor sit amet, consectetur{" "}
                  <span className="bg-black text-white px-1">
                    adipiscing elit.
                  </span>{" "}
                  Morbi consequat ex ac.
                </p>
                <p className="text-4xl max-w-sm text-right">
                  Lorem ipsum dolor sit amet, consectetur{" "}
                  <span className="bg-black text-white px-1">
                    adipiscing elit.
                  </span>{" "}
                  Maecenas id semper urna, at varius turpis. Proin id.
                </p>
              </div>
            </Copy>
          </div>

          <h1 ref={logoRef}>COLDEST</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
