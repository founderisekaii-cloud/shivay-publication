import { getReviews } from "@/lib/data";
import { ReviewCard } from "../review-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export async function Testimonials() {
  const reviews = await getReviews();

  return (
    <section className="w-full">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">What Our Authors Say</h2>
        <Carousel
            opts={{
            align: "start",
            loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
        >
            <CarouselContent>
            {reviews.map(review => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-4 h-full">
                        <ReviewCard review={review} />
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
