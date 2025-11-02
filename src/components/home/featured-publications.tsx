import { getPublications } from "@/lib/data";
import { PublicationCard } from "../publication-card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function FeaturedPublications() {
  const publications = await getPublications();
  const featured = publications.slice(0, 3);

  return (
    <section className="w-full text-center">
      <h2 className="font-headline text-3xl md:text-4xl font-bold mb-2">Our Core Services</h2>
       <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
        From manuscript to masterpiece, we provide authors with the tools and expertise to succeed.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} isService />
          ))}
      </div>

      <Button asChild size="lg" className="mt-12 group" variant="outline">
          <Link href="/about#services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
      </Button>
    </section>
  );
}
