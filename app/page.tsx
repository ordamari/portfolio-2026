import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { HeroStill } from "@/components/Poster";
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
        <script dangerouslySetInnerHTML={{ __html: heroStillScript }} />
      </main>
    </>
  );
}
