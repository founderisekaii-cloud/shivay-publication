"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { AnnouncementsMarquee } from '../home/announcements-marquee';
import type { Announcement } from '@/lib/mock-data';
import { isFirebaseEnabled } from '@/lib/firebase-config';
import { getAuthState, signOutUser } from '@/lib/auth';
import type { User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/publications', label: 'Publications' },
  { href: '/archives', label: 'Archives' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/staff', label: 'Our Team' },
  { href: '/reviews', label: 'Reviews' },
];

export function Header({ announcements }: { announcements: Announcement[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isFirebaseEnabled) {
      const unsubscribe = getAuthState((user) => {
        setUser(user);
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast({ title: "Logged out successfully." });
      router.push('/');
    } catch (error) {
      toast({ variant: "destructive", title: "Logout failed", description: error instanceof Error ? error.message : "An error occurred." });
    }
  };
  
  const getAvatarFallback = (name: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('');
  }

  const renderAuthButtons = () => {
    if (isLoading) {
      return null; // Or a loading spinner
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                <AvatarFallback>{getAvatarFallback(user.displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="hidden md:flex items-center gap-2">
        <Button asChild>
          <Link href="/submit">Submit Manuscript</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Author Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
           {renderAuthButtons()}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                   <Logo />
                   <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                   </Button>
                </div>
                <div className="flex-1 flex flex-col justify-center p-4">
                    <nav className="flex flex-col items-start gap-4 text-lg font-medium">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-primary text-foreground/80 w-full p-2 rounded-md hover:bg-secondary"
                        onClick={() => setIsMobileMenuOpen(false)}
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                </div>
                 <div className="p-4 border-t flex flex-col gap-2">
                    <Button asChild onClick={() => setIsMobileMenuOpen(false)} size="lg">
                        <Link href="/submit">Submit Manuscript</Link>
                    </Button>
                    <Button asChild variant="outline" onClick={() => setIsMobileMenuOpen(false)} size="lg">
                        <Link href="/login">Author Login</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {announcements.length > 0 && <AnnouncementsMarquee announcements={announcements} />}
    </header>
  );
}
