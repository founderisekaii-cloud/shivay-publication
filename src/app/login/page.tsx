import { AuthForm } from "@/components/auth-form";
import { LogIn } from "lucide-react";

export const metadata = {
  title: "Login | Shivay Publications",
  description: "Access your author account.",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <LogIn className="h-10 w-10 text-primary" />
                </div>
                <h1 className="font-headline text-4xl font-bold">Welcome Back</h1>
                <p className="mt-2 text-muted-foreground">
                    Sign in to access your dashboard.
                </p>
            </div>
            <AuthForm type="login" />
        </div>
    </div>
  );
}
