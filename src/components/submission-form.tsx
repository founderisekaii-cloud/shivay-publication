"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { isFirebaseEnabled } from "@/lib/firebase-config";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";
import { Progress } from "./ui/progress";

const submissionSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  manuscript: z.instanceof(FileList).refine(files => files?.length === 1, "A manuscript file is required."),
  comments: z.string().optional(),
});

type SubmissionFormValues = z.infer<typeof submissionSchema>;

export function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      comments: "",
    },
  });

  const fileRef = form.register("manuscript");

  const onSubmit = async (data: SubmissionFormValues) => {
    setIsSubmitting(true);
    setUploadProgress(0);

    if (!isFirebaseEnabled) {
      // Demo mode
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        setUploadProgress(Math.min(progress, 100));
        if (progress >= 100) {
          clearInterval(interval);
          setIsSubmitting(false);
          toast({
            title: "Submission Sent (Demo)",
            description: "Your manuscript has been successfully submitted in demo mode.",
          });
          form.reset();
        }
      }, 300);
      return;
    }
    
    // TODO: Implement actual Firebase Storage upload
    // For now, we will simulate it as the logic is complex and depends on a live backend.
    setIsSubmitting(false);
    toast({
        title: "Live submission not implemented",
        description: "Firebase Storage upload needs to be implemented.",
        variant: "destructive"
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="jane.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manuscript Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The Next Great Novel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manuscript"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manuscript File (PDF, DOCX)</FormLabel>
                  <FormControl>
                    <Input type="file" accept=".pdf,.doc,.docx" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any notes for the editor..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {isSubmitting && (
                <div className="space-y-2">
                    <Progress value={uploadProgress} />
                    <p className="text-sm text-muted-foreground text-center">Uploading manuscript... {Math.round(uploadProgress)}%</p>
                </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2 h-4 w-4" /> Submit for Review
                </>
              )}
            </Button>
            {!isFirebaseEnabled && (
              <p className="text-xs text-center text-muted-foreground">
                Note: Running in demo mode. No file will be actually uploaded.
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
