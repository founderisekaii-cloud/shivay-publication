import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '../ui/button';

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us');

  return (
    <section className="w-full">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">About Shivay Publications</h2>
          <p className="text-muted-foreground text-lg">
            Shivay Publications is one of the fastest growing self-publishing platforms in India. We are a team of professionals dedicated to providing the best services to our authors, having published over 2,000 books across various genres and languages.
          </p>
          <p className="text-muted-foreground">
            Our mission is to empower authors by providing a comprehensive suite of services including editing, cover design, ISBN allocation, marketing, and a strong distribution network in India and worldwide.
          </p>
          <Button asChild variant="outline">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
        <div className="relative aspect-[3/2] rounded-lg overflow-hidden shadow-lg">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
      </div>
    </section>
  );
}
