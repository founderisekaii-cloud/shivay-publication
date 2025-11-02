import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us');

  return (
    <section className="w-full">
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
         <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
        <div className="space-y-6">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Empowering Authors, One Story at a Time</h2>
          <p className="text-muted-foreground text-lg">
            Shivay Publications is one of the fastest growing self-publishing platforms in India. We are a team of professionals dedicated to providing the best services to our authors, having published over 2,000 books across various genres and languages.
          </p>
          <ul className="space-y-3">
              <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Comprehensive publishing services</span>
              </li>
              <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Global distribution network</span>
              </li>
               <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Dedicated author support</span>
              </li>
          </ul>
          <Button asChild>
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
