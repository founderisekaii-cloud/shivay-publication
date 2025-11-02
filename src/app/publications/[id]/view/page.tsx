import { getPublications } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PdfViewPageProps = {
    params: { id: string };
};

export default async function PdfViewPage({ params }: PdfViewPageProps) {
    const publications = await getPublications();
    const publication = publications.find(p => p.id === params.id);

    if (!publication || !publication.pdfUrl) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <Button asChild variant="outline" size="sm" className="mb-4">
                                <Link href={`/publications/${params.id}`}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Details
                                </Link>
                            </Button>
                            <CardTitle className="font-headline text-2xl">{publication.title}</CardTitle>
                        </div>
                        <Button asChild>
                             <a href={publication.pdfUrl} download>
                                <Download className="mr-2" />
                                Download PDF
                            </a>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="aspect-[8.5/11] w-full rounded-lg border">
                        <iframe
                            src={publication.pdfUrl}
                            title={`PDF viewer for ${publication.title}`}
                            className="w-full h-full"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
