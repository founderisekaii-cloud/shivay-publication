import { getPublications } from "@/lib/data";
import { PublicationCard } from "../publication-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export async function FeaturedPublications() {
  const publications = await getPublications();
  const featured = publications.slice(0, 3);

  return (
    <section className="w-full">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">Featured Publications</h2>
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
              <div className="p-1">
                <PublicationCard publication={pub} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
