"use client";

import { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { summarizeReviewsAction } from '@/app/actions';
import type { Review } from '@/lib/mock-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card, CardContent } from './ui/card';

export function ReviewSummarizer({ reviews }: { reviews: Review[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<{ summary: string; keyPoints: string[] } | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary(null);
    try {
      const reviewStrings = reviews.map(r => r.comment);
      const result = await summarizeReviewsAction({ reviews: reviewStrings });
      if (result.error) {
        throw new Error(result.error);
      }
      setSummary(result.data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error Summarizing Reviews',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">Overwhelmed by reviews?</h3>
              <p className="text-muted-foreground text-sm">Let our AI assistant provide a quick summary of all customer feedback.</p>
            </div>
            <Button onClick={handleSummarize} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Summarize with AI
                </>
              )}
            </Button>
          </div>
          {summary && (
             <div className="mt-6">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className='font-headline text-lg'>AI Summary & Key Points</AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-4 pt-2'>
                        <h4 className='font-semibold'>Overall Summary</h4>
                        <p className='text-muted-foreground'>{summary.summary}</p>
                        <h4 className='font-semibold'>Key Points</h4>
                        <ul className='list-disc list-inside space-y-1 text-muted-foreground'>
                            {summary.keyPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
