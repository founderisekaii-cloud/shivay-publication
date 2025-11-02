import { Star, StarHalf } from 'lucide-react';
import type { Review } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ReviewCardProps {
  review: Review;
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-accent">
      {[...Array(fullStars)].map((_, i) => <Star key={`full_${i}`} className="h-5 w-5 fill-current" />)}
      {halfStar && <StarHalf key="half" className="h-5 w-5 fill-current" />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty_${i}`} className="h-5 w-5 text-muted-foreground/50" />)}
    </div>
  );
};

export function ReviewCard({ review }: ReviewCardProps) {
    const fallback = review.customerName.split(' ').map(n => n[0]).join('');
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg font-medium">{review.customerName}</CardTitle>
            </div>
            <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground italic">&ldquo;{review.comment}&rdquo;</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
      </CardFooter>
    </Card>
  );
}
