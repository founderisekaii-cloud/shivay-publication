import { AuthForm } from "@/components/auth-form";
import { UserPlus } from "lucide-react";

export const metadata = {
  title: "Sign Up | Shivay Publications",
  description: "Create an author account.",
};

export default function SignUpPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="max-w-md mx-auto">
             <div className="text-center mb-8">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <UserPlus className="h-10 w-10 text-primary" />
                </div>
                <h1 className="font-headline text-4xl font-bold">Create Your Account</h1>
                <p className="mt-2 text-muted-foreground">
                    Join our community of authors today.
                </p>
            </div>
            <AuthForm type="signup" />
        </div>
    </div>
  );
}
