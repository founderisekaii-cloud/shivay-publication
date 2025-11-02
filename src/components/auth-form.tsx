"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { isFirebaseEnabled } from "@/lib/firebase-config";
import { signInUser, signUpUser, getAuthState } from "@/lib/auth";
import type { User } from "firebase/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type AuthFormProps = {
  type: 'login' | 'signup';
};

export function AuthForm({ type }: AuthFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isFirebaseEnabled) {
      return getAuthState((user) => {
        if (user) {
          router.push('/dashboard');
        }
        setUser(user);
      });
    }
  }, [router]);


  const schema = type === 'login' ? loginSchema : signupSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: type === 'login' 
      ? { email: "", password: "" }
      : { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    if (!isFirebaseEnabled) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      toast({
        title: type === 'login' ? "Login Successful (Demo)" : "Signup Successful (Demo)",
        description: type === 'login' ? "Redirecting to your dashboard..." : "Redirecting to dashboard...",
      });
      form.reset();
      router.push('/dashboard');
      return;
    }

    try {
      if (type === 'signup') {
        const { email, password, name } = data as z.infer<typeof signupSchema>;
        await signUpUser(email, password, name);
        toast({
          title: "Signup Successful!",
          description: "Welcome! Redirecting to your dashboard...",
        });
      } else {
        const { email, password } = data as z.infer<typeof loginSchema>;
        await signInUser(email, password);
        toast({
          title: "Login Successful!",
          description: "Welcome back! Redirecting...",
        });
      }
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return null; // Don't render the form if the user is already logged in
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {type === 'signup' && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="jane.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                type === 'login' ? 'Login' : 'Create Account'
              )}
            </Button>
            {!isFirebaseEnabled && (
             <p className="text-xs text-center text-muted-foreground">
                Note: Running in demo mode. No account will be created.
              </p>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-sm justify-center">
        {type === 'login' ? (
          <p>Don't have an account? <Link href="/signup" className="text-primary hover:underline">Sign up</Link></p>
        ) : (
          <p>Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link></p>
        )}
      </CardFooter>
    </Card>
  );
}
