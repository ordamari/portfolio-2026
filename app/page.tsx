import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { ArtPicture } from "@/components/Poster";
import { SkipLink } from "@/components/SkipLink";

const LANDSCAPE = { width: 1280, height: 720 };
const PORTRAIT = { width: 720, height: 1280 };

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
            hero: (
              <ArtPicture
                className="art"
                priority
                marked
                desktop={{ src: "/hero/hero-desktop-poster.webp", ...LANDSCAPE }}
                mobile={{ src: "/hero/hero-mobile-poster.webp", ...PORTRAIT }}
              />
            ),
            end: (
              <ArtPicture
                className="art end-still"
                desktop={{ src: "/hero/hero-desktop-end.webp", ...LANDSCAPE }}
                mobile={{ src: "/hero/hero-mobile-end.webp", ...PORTRAIT }}
              />
            ),
          }}
        />
      </main>
    </>
  );
}
