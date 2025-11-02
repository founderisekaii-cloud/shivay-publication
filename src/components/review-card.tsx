import { Star } from 'lucide-react';
import type { Review } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ReviewCardProps {
  review: Review;
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array(5).fill(0);
  return (
    <div className="flex text-yellow-400">
      {stars.map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

export function ReviewCard({ review }: ReviewCardProps) {
    const fallback = review.customerName.split(' ').map(n => n[0]).join('');
  return (
    <Card className="h-full flex flex-col bg-secondary border-transparent shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-4">
            <Avatar>
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{review.customerName}</p>
                <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
            </div>
            <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm italic">&ldquo;{review.comment}&rdquo;</p>
      </CardContent>
    </Card>
  );
}
