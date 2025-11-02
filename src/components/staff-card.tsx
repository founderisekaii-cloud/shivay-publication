import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { StaffMember } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface StaffCardProps {
  staff: StaffMember;
}

export function StaffCard({ staff }: StaffCardProps) {
  const image = PlaceHolderImages.find(img => img.id === staff.imageId);

  return (
    <Card className="overflow-hidden text-center transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={`Portrait of ${staff.name}`}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="font-headline text-2xl">{staff.name}</CardTitle>
        <CardDescription className="text-primary mt-1 font-semibold">{staff.role}</CardDescription>
        <p className="text-muted-foreground mt-4 text-sm">{staff.bio}</p>
        {staff.publications.length > 0 && (
            <div className="mt-4">
                <Badge variant="secondary">Key Publication: {staff.publications[0]}</Badge>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
