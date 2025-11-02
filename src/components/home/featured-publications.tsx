import { getPublications } from "@/lib/data";
import { PublicationCard } from "../publication-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function FeaturedPublications() {
  const publications = await getPublications();
  const featured = publications.slice(0, 3);

  return (
    <section className="w-full text-center">
      <h2 className="font-headline text-3xl md:text-4xl font-bold mb-2">Our Publishing Services</h2>
       <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        We provide authors with the tools and expertise to succeed. Here are some of our core offerings.
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {featured.map((pub) => (
            <CarouselItem key={pub.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <PublicationCard publication={pub} isService />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
        <Button asChild size="lg" className="mt-8 group">
            <Link href="/about#services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
        </Button>
    </section>
  );
}
