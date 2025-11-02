import type { Announcement } from "@/lib/mock-data";
import { Megaphone } from "lucide-react";

export function AnnouncementsMarquee({ announcements }: { announcements: Announcement[] }) {
    const extendedAnnouncements = [...announcements, ...announcements];

  return (
    <div className="bg-primary text-primary-foreground py-2 text-sm overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        <div className="animate-marquee flex items-center">
          {extendedAnnouncements.map((announcement, index) => (
            <span key={index} className="mx-4 flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span>{announcement.title}</span>
            </span>
          ))}
        </div>
        <div className="animate-marquee flex items-center absolute top-0">
          {extendedAnnouncements.map((announcement, index) => (
            <span key={index} className="mx-4 flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span>{announcement.title}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
