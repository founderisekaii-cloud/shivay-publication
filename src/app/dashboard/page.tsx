"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthState, signOutUser } from '@/lib/auth';
import type { User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, LogOut, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { isFirebaseEnabled } from '@/lib/firebase-config';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isFirebaseEnabled) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = getAuthState((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast({ title: "Logged out successfully." });
      router.push('/');
    } catch (error) {
      toast({ variant: "destructive", title: "Logout failed", description: error instanceof Error ? error.message : "An error occurred." });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const displayName = user?.displayName || 'Valued Author';
  const email = user?.email || 'No email provided';

  // Demo mode content
  if (!isFirebaseEnabled) {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
             <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Welcome, Demo User!</CardTitle>
                    <CardDescription>This is your author dashboard (Demo Mode).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>From here, you will be able to manage your submissions, track your publication progress, and access author resources.</p>
                    <Button onClick={() => router.push('/')}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <div className='flex justify-between items-start'>
                <div>
                    <CardTitle className="font-headline text-3xl">Welcome, {displayName}!</CardTitle>
                    <CardDescription>This is your author dashboard.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-4 rounded-lg border p-4 bg-secondary">
                <div className="bg-primary/10 p-3 rounded-full">
                    <UserIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="font-semibold">Your Profile</p>
                    <p className="text-sm text-muted-foreground">{email}</p>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-headline mb-4">Your Submissions</h3>
                <div className="border rounded-lg p-8 text-center text-muted-foreground">
                    <p>You have not made any submissions yet.</p>
                    <Button asChild variant="link" className="mt-2">
                        <a href="/submit">Submit a Manuscript</a>
                    </Button>
                </div>
            </div>
             <div>
                <h3 className="text-xl font-headline mb-4">Author Resources</h3>
                <div className="border rounded-lg p-8 text-center text-muted-foreground">
                    <p>Resources and guides will be available here soon.</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
