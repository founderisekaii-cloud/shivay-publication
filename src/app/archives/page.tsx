import { getPublications } from "@/lib/data";
import { PublicationCard } from "@/components/publication-card";
import { groupPublicationsByYear } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Archives | Shivay Publications",
  description: "Browse our archived collection of books and publications from previous years.",
};

export default async function ArchivesPage() {
  const publications = await getPublications();
  const groupedPublications = groupPublicationsByYear(publications);
  const sortedYears = Object.keys(groupedPublications).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Publication Archives</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our rich history of published works from past years.
        </p>
      </div>

      <div className="space-y-16">
        {sortedYears.map((year) => (
          <section key={year}>
            <h2 className="font-headline text-3xl font-bold mb-6">{year}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {groupedPublications[year].map(pub => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
            </div>
          </section>
        ))}
        {sortedYears.length === 0 && (
            <div className="text-center text-muted-foreground">
                <p>No publications found in the archive.</p>
            </div>
        )}
      </div>
    </div>
  );
}
