import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { BookOpen, Archive, Send, Pencil } from "lucide-react";

const links = [
    {
        href: "/services",
        title: "Our Services",
        description: "Editing, publishing, and more.",
        icon: Pencil,
    },
    {
        href: "/archives",
        title: "Archives",
        description: "Explore our past publications.",
        icon: Archive,
    },
    {
        href: "/submit",
        title: "Submit Your Work",
        description: "Share your manuscript with us.",
        icon: Send,
    },
    {
        href: "/contact",
        title: "Contact Us",
        description: "Get in touch with our team.",
        icon: BookOpen,
    }
]

export function QuickLinks() {
  return (
    <section className="w-full">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">Explore Shivay</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map(link => (
          <Link key={link.href} href={link.href} className="group">
             <Card className="h-full hover:border-primary hover:shadow-lg transition-all">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <link.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="font-headline group-hover:text-primary transition-colors">{link.title}</CardTitle>
                            <CardDescription>{link.description}</CardDescription>
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
