import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { BookOpen, Send, Pencil, Mail, Users, Star } from "lucide-react";

const links = [
    {
        href: "/about#services",
        title: "Our Services",
        description: "Editing, Publishing, and more.",
        icon: Pencil,
    },
    {
        href: "/publications",
        title: "Our Publications",
        description: "Explore books we have published.",
        icon: BookOpen,
    },
    {
        href: "/submit",
        title: "Submit Your Work",
        description: "Share your manuscript with us.",
        icon: Send,
    },
     {
        href: "/staff",
        title: "Meet the Team",
        description: "Our dedicated professionals.",
        icon: Users,
    },
    {
        href: "/reviews",
        title: "Author Reviews",
        description: "See what our authors are saying.",
        icon: Star,
    },
    {
        href: "/about#contact",
        title: "Contact Us",
        description: "Get in touch with our team.",
        icon: Mail,
    }
]

export function QuickLinks() {
  return (
    <section className="w-full">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Explore Shivay</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map(link => (
          <Link key={link.href} href={link.href} className="group">
             <Card className="h-full hover:border-primary hover:shadow-lg transition-all duration-300 bg-secondary border-transparent">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="bg-background p-3 rounded-lg">
                             <link.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">{link.title}</CardTitle>
                            <CardDescription className="text-sm">{link.description}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
