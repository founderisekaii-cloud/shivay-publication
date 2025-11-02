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
            Founded in 2010, Shivay Publications has been a cornerstone of literary excellence, committed to discovering unique voices and sharing powerful stories. We believe in the transformative power of books and are dedicated to publishing works that inspire, entertain, and enlighten.
          </p>
          <p className="text-muted-foreground">
            Our mission is to bridge the gap between talented authors and avid readers, ensuring that every manuscript gets the attention it deserves. From rigorous editing to beautiful design and strategic marketing, we support our authors every step of the way.
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
