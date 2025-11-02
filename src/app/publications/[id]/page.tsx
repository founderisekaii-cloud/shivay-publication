import { getPublications } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from 'next'

type PublicationDetailPageProps = {
    params: { id: string };
};

export async function generateMetadata({ params }: PublicationDetailPageProps): Promise<Metadata> {
    const publications = await getPublications();
    const publication = publications.find(p => p.id === params.id);

    if (!publication) {
        return {
            title: "Publication Not Found",
        }
    }

    return {
        title: `${publication.title} | Shivay Publications`,
        description: publication.description,
    };
}

export default async function PublicationDetailPage({ params }: PublicationDetailPageProps) {
    const publications = await getPublications();
    const publication = publications.find(p => p.id === params.id);

    if (!publication) {
        notFound();
    }

    const coverImage = PlaceHolderImages.find(img => img.id === publication.coverImageId);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
            <div className="mb-8">
                <Button asChild variant="outline">
                    <Link href="/publications">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Publications
                    </Link>
                </Button>
            </div>
            <Card>
                <div className="grid md:grid-cols-2">
                    <div className="relative aspect-[4/3] md:aspect-auto">
                        {coverImage && (
                             <Image
                                src={coverImage.imageUrl}
                                alt={`Cover of ${publication.title}`}
                                fill
                                className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                data-ai-hint={coverImage.imageHint}
                            />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <CardHeader className="flex-1">
                            <CardTitle className="font-headline text-3xl md:text-4xl">{publication.title}</CardTitle>
                            <CardDescription className="text-lg">by {publication.author}</CardDescription>
                            <div className="pt-4">
                                <Badge variant="secondary">Published on {formatDate(publication.releaseDate)}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-muted-foreground">{publication.description}</p>
                        </CardContent>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-2">
                                {publication.pdfUrl && (
                                    <>
                                        <Button asChild className="w-full">
                                            <Link href={`/publications/${publication.id}/view`}>
                                                <Eye className="mr-2" />
                                                View PDF
                                            </Link>
                                        </Button>
                                        <Button asChild variant="secondary" className="w-full">
                                            <a href={publication.pdfUrl} download>
                                                <Download className="mr-2" />
                                                Download PDF
                                            </a>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// Statically generate routes for each publication
export async function generateStaticParams() {
    const publications = await getPublications();
    return publications.map(pub => ({ id: pub.id }));
}
