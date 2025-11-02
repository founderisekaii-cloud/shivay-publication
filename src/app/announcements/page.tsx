import { getAnnouncements } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Megaphone } from "lucide-react";

export const metadata = {
  title: "Announcements | Shivay Publications",
  description: "Latest news and announcements from Shivay Publications.",
};

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Announcements</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay up-to-date with the latest news from Shivay Publications.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Megaphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription>{formatDate(announcement.date)}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
        {announcements.length === 0 && (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No announcements at this time. Please check back later.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
