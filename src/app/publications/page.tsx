import { getPublications } from "@/lib/data";
import { PublicationCard } from "@/components/publication-card";

export const metadata = {
  title: "Publications | Shivay Publications",
  description: "Explore our collection of books and publications from talented authors.",
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Published Works</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A selection of books we've helped bring to life.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {publications.map(pub => (
          <PublicationCard key={pub.id} publication={pub} />
        ))}
      </div>
    </div>
  );
}
