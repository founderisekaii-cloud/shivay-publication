import Link from 'next/link';
import { Github, Twitter, Linkedin, BookHeart } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground">
             Your trusted partner in publishing. We help authors bring their stories to life and share them with the world.
            </p>
             <div className="flex gap-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/publications" className="text-muted-foreground hover:text-primary transition-colors">Publications</Link></li>
              <li><Link href="/submit" className="text-muted-foreground hover:text-primary transition-colors">Submit Work</Link></li>
              <li><Link href="/about#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
           <div className="space-y-4">
            <h4 className="font-headline font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about#services" className="text-muted-foreground hover:text-primary transition-colors">Editing</Link></li>
              <li><Link href="/about#services" className="text-muted-foreground hover:text-primary transition-colors">Cover Design</Link></li>
              <li><Link href="/about#services" className="text-muted-foreground hover:text-primary transition-colors">Publishing</Link></li>
              <li><Link href="/about#services" className="text-muted-foreground hover:text-primary transition-colors">Distribution</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Subscribe to our Newsletter</h4>
            <p className="text-sm text-muted-foreground">Get the latest news on releases and author events.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="your@email.com" className="flex-1 bg-background" />
              <Button type="submit" variant="default">Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8 bg-border/50" />
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shivay Publications. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
