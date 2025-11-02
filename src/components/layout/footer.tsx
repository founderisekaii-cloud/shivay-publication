import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Dedicated to bringing timeless stories and essential knowledge to readers everywhere.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/archives" className="text-muted-foreground hover:text-primary">Archives</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Subscribe to our Newsletter</h4>
            <p className="text-sm text-muted-foreground">Get the latest news on releases and author events.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email address" className="flex-1" />
              <Button type="submit" variant="default">Subscribe</Button>
            </form>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shivay Publications. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
