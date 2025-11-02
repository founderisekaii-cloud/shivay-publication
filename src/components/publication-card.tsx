import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Publication } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const coverImage = PlaceHolderImages.find(img => img.id === publication.coverImageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
          {coverImage ? (
            <Image
              src={coverImage.imageUrl}
              alt={`Cover of ${publication.title}`}
              fill
              className="object-cover"
              data-ai-hint={coverImage.imageHint}
            />
          ) : (
            <div className="bg-muted w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <CardTitle className="font-headline text-xl mb-2 group-hover:text-primary transition-colors">{publication.title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {publication.author}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/publications/${publication.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
