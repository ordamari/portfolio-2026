import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { HeroStill } from "@/components/Poster";
import { Projects } from "@/components/Projects";
import { SkipLink } from "@/components/SkipLink";
import { heroStillScript } from "@/lib/hero-source";

export default function Page() {
  return (
    <>
      <SkipLink />
      <header className="site-header">
        <Nav />
      </header>
      <main id="top">
        <Intro
          posters={{
            hero: <HeroStill kind="poster" className="art" marked />,
            end: <HeroStill kind="end" className="art end-still" />,
          }}
        />
        <Experience />
        <Projects />
        <Contact />
        <script dangerouslySetInnerHTML={{ __html: heroStillScript }} />
      </main>
      <Footer />
    </>
  );
}
