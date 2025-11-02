import { getReviews } from "@/lib/data";
import { ReviewCard } from "@/components/review-card";
import { ReviewSummarizer } from "@/components/review-summarizer";

export const metadata = {
  title: "Customer Reviews | Shivay Publications",
  description: "See what our readers and authors have to say about us.",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Customer Reviews</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Feedback from our valued community of readers and authors.
        </p>
      </div>
      
      <ReviewSummarizer reviews={reviews} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
