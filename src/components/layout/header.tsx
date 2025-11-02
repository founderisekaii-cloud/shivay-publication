"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { AnnouncementsMarquee } from '../home/announcements-marquee';
import type { Announcement } from '@/lib/mock-data';

const navLinks = [
  { href: '/publications', label: 'Publications' },
  { href: '/staff', label: 'Our Team' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/submit', label: 'Submit' },
];

export function Header({ announcements }: { announcements: Announcement[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                   <Logo />
                   <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                   </Button>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <nav className="flex flex-col items-center gap-6 text-lg font-medium">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-foreground/80 text-foreground/80"
                        onClick={() => setIsMobileMenuOpen(false)}
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                </div>
                 <Button asChild className="m-4">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {announcements.length > 0 && <AnnouncementsMarquee announcements={announcements} />}
    </header>
  );
}
