import { BookHeart } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <BookHeart className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
      <span className="font-headline text-2xl font-bold text-foreground group-hover:text-foreground/80 transition-colors">
        Shivay
      </span>
    </Link>
  );
}
