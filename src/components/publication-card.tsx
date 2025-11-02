import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Publication } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface PublicationCardProps {
  publication: Publication;
  isService?: boolean;
}

export function PublicationCard({ publication, isService = false }: PublicationCardProps) {
  const coverImage = PlaceHolderImages.find(img => img.id === publication.coverImageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-transparent hover:border-primary">
      <CardHeader className="p-0">
        <Link href={isService ? `/about#services` : `/publications/${publication.id}`} className='block w-full'>
          <div className="relative aspect-[4/3] w-full">
            {coverImage ? (
              <Image
                src={coverImage.imageUrl}
                alt={`Cover of ${publication.title}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={coverImage.imageHint}
              />
            ) : (
              <div className="bg-muted w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
              </div>
            )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <Link href={isService ? `/about#services` : `/publications/${publication.id}`}>
          <CardTitle className="font-headline text-xl mb-2 group-hover:text-primary transition-colors">{publication.title}</CardTitle>
        </Link>
        <CardDescription className="text-sm flex-grow">{publication.description}</CardDescription>
      </CardContent>
       <CardFooter className="p-6 pt-0 mt-auto">
        <Button asChild variant="ghost" size="sm" className="w-full justify-start p-0 h-auto group/button">
          <Link href={isService ? `/about#services` : `/publications/${publication.id}`} className="text-primary">
            {isService ? 'Learn More' : 'View Details'}
            <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
