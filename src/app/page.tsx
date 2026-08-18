import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import SofritoSpotlight from "@/components/home/SofritoSpotlight";
import FeaturedMenu from "@/components/home/FeaturedMenu";
// LUNCH REMOVED: import Ordering from "@/components/home/Ordering";
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <SofritoSpotlight />
      <FeaturedMenu />
      {/* LUNCH REMOVED: <Ordering /> */}
    </>
  );
}
