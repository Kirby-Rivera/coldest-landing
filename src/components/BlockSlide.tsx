import { useRef, ReactNode } from "react";

import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  stagger?: number;
  duration?: number;
}

function Copy({
  children,
  animateOnScroll = true,
  delay = 1,
  blockColor = "#00000",
  stagger = 0.15,
  duration = 1,
}: CopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<SplitText[]>([]);
  const lines = useRef<HTMLElement[]>([]);
  const blocks = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRefs.current = [];
      lines.current = [];
      blocks.current = [];

      let elements: Element[] = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        const split = SplitText.create(element, {
          type: "lines",
          linesClass: "block-line++",
          lineThreshold: 0.1,
        });

        splitRefs.current.push(split);

        split.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.className = "block-line-wrapper";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);

          const block = document.createElement("div");
          block.className = "block-revealer";
          block.style.backgroundColor = blockColor;
          wrapper.appendChild(block);

          lines.current.push(line as HTMLElement);
          blocks.current.push(block);
        });
      });

      gsap.set(lines.current, { opacity: 0 });
      gsap.set(blocks.current, { scaleX: 0, transformOrigin: "left center" });

      const createBlockRevealAnimation = (
        block: HTMLDivElement,
        line: HTMLElement,
        index: number
      ): gsap.core.Timeline => {
        const tl = gsap.timeline({
          delay: delay + index * stagger,
        });

        tl.to(block, { scaleX: 1, duration: duration, ease: "power4.inOut" });
        tl.set(line, { opacity: 1 });
        tl.set(block, { transformOrigin: "right center" });
        tl.to(block, { scaleX: 0, duration: duration, ease: "power4.inOut" });

        return tl;
      };

      if (animateOnScroll) {
        blocks.current.forEach((block, index) => {
          const tl = createBlockRevealAnimation(
            block,
            lines.current[index],
            index
          );
          tl.pause();

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            once: true,
            onEnter: () => tl.play(),
          });
        });
      } else {
        blocks.current.forEach((block, index) => {
          createBlockRevealAnimation(block, lines.current[index], index);
        });
      }

      return () => {
        splitRefs.current.forEach((split) => split?.revert());

        const wrappers = containerRef.current?.querySelectorAll(
          ".block-line-wrapper"
        );

        wrappers?.forEach((wrapper) => {
          if (wrapper.parentNode && wrapper.firstChild) {
            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
            wrapper.remove();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, blockColor, stagger, duration],
    }
  );

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}

export default Copy;