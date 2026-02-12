import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Outfit } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={outfit.className}>
      <Component {...pageProps} />
    </main>
  );
}
