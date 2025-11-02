import { SubmissionForm } from "@/components/submission-form";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Submit Your Work | Shivay Publications",
  description: "Submit your manuscript for consideration by our editorial team.",
};

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                <FileText className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Submit Your Manuscript</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                We are excited to read your work. Please fill out the form below to submit your manuscript to our editorial team.
            </p>
        </div>
        <SubmissionForm />
      </div>
    </div>
  );
}
