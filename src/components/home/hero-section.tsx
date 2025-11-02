import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner');

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh]">
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
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 text-center text-foreground">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl md:text-6xl font-bold !leading-tight tracking-tighter">
              Your Trusted Partner in Publishing
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Shivay Publications is dedicated to nurturing new talent and bringing captivating stories to readers worldwide.
            </p>
            <Button asChild size="lg" className="mt-8 group">
              <Link href="/publications">
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
