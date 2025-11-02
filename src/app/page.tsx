import { AboutSection } from "@/components/home/about-section";
import { FeaturedPublications } from "@/components/home/featured-publications";
import { HeroSection } from "@/components/home/hero-section";
import { QuickLinks } from "@/components/home/quick-links";
import { Testimonials } from "@/components/home/testimonials";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <div className="w-full container px-4 md:px-6 space-y-16 md:space-y-24 my-16 md:my-24">
        <AboutSection />
        <Separator />
        <FeaturedPublications />
        <Separator />
        <Testimonials />
        <Separator />
        <QuickLinks />
      </div>
    </div>
  );
}
