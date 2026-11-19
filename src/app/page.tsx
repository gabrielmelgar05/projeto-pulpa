import { SiteProviders } from "@/components/providers/SiteProviders";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Collection } from "@/components/sections/Collection";
import { FruitUniverse } from "@/components/sections/FruitUniverse";
import { Philosophy } from "@/components/sections/Philosophy";
import { Experience } from "@/components/sections/Experience";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/layout/Footer";
import { ShapeDefs } from "@/components/ui/ShapeDefs";
import { getAvailableAssetIds } from "@/lib/assets.server";

export default function Home() {
  const availableAssets = getAvailableAssetIds();

  return (
    <SiteProviders availableAssets={availableAssets}>
      <ShapeDefs />
      <Preloader />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Collection />
        <FruitUniverse />
        <Philosophy />
        <Experience />
        <FinalCta />
      </main>
      <Footer />
      <div className="grain" aria-hidden />
    </SiteProviders>
  );
}
