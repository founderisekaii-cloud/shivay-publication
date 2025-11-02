import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner');

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh]">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 text-center text-foreground">
          <div className="bg-background/90 backdrop-blur-sm rounded-xl p-8 md:p-12 max-w-3xl mx-auto shadow-2xl">
            <h1 className="font-headline text-4xl md:text-6xl font-bold !leading-tight tracking-tighter">
              Your Trusted Partner in Publishing
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Shivay Publications is dedicated to nurturing new talent and bringing captivating stories to readers worldwide.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/submit">
                  Submit Your Work
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
               <Button asChild size="lg" variant="outline" className="group">
                <Link href="/about#services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
