import { getReviews } from "@/lib/data";
import { ReviewCard } from "../review-card";

export async function Testimonials() {
  const reviews = await getReviews();
  const featuredReviews = reviews.slice(0, 3);

  return (
    <section className="w-full">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">What Our Readers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
