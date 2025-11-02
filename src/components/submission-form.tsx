
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
import { isFirebaseEnabled, firebaseStorage } from "@/lib/firebase-config";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";
import { Progress } from "./ui/progress";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

    if (!isFirebaseEnabled || !firebaseStorage) {
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
    
    const file = data.manuscript[0];
    if(!file) {
        setIsSubmitting(false);
        toast({ variant: "destructive", title: "No file selected", description: "Please select a manuscript file to upload." });
        return;
    }

    try {
        const storageRef = ref(firebaseStorage, `submissions/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload failed:", error);
                toast({
                    variant: "destructive",
                    title: "Upload Failed",
                    description: "Something went wrong while uploading your file. Please try again."
                });
                setIsSubmitting(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('File available at', downloadURL);

                // TODO: Here you would typically save the submission data (including downloadURL) to Firestore.
                // Since Firestore permissions are still pending, we will just show a success message.
                
                toast({
                    title: "Submission Successful!",
                    description: "Your manuscript has been uploaded. We will review it shortly.",
                });
                form.reset();
                setIsSubmitting(false);
                setUploadProgress(0);
            }
        );

    } catch (error) {
        console.error("Submission error:", error);
        toast({
            variant: "destructive",
            title: "Submission Error",
            description: error instanceof Error ? error.message : "An unexpected error occurred.",
        });
        setIsSubmitting(false);
    }
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

    