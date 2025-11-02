import { getStaff } from "@/lib/data";
import { StaffCard } from "@/components/staff-card";

export const metadata = {
  title: "Our Team | Shivay Publications",
  description: "Meet the dedicated team behind Shivay Publications.",
};

export default async function StaffPage() {
  const staffMembers = await getStaff();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Team</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          The passionate individuals dedicated to bringing great literature to light.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staffMembers.map(staff => (
          <StaffCard key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  );
}
