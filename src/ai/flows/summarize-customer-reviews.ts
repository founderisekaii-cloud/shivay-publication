// Summarize Customer Reviews
'use server';
/**
 * @fileOverview A GenAI tool to automatically summarize customer reviews.
 *
 * - summarizeCustomerReviews - A function that handles the summarization of customer reviews.
 * - SummarizeCustomerReviewsInput - The input type for the summarizeCustomerReviews function.
 * - SummarizeCustomerReviewsOutput - The return type for the summarizeCustomerReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCustomerReviewsInputSchema = z.object({
  reviews: z.array(z.string()).describe('An array of customer reviews.'),
});
export type SummarizeCustomerReviewsInput = z.infer<typeof SummarizeCustomerReviewsInputSchema>;

const SummarizeCustomerReviewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the customer reviews.'),
  keyPoints: z.array(z.string()).describe('Key points extracted from the customer reviews.'),
});
export type SummarizeCustomerReviewsOutput = z.infer<typeof SummarizeCustomerReviewsOutputSchema>;

export async function summarizeCustomerReviews(input: SummarizeCustomerReviewsInput): Promise<SummarizeCustomerReviewsOutput> {
  return summarizeCustomerReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCustomerReviewsPrompt',
  input: {schema: SummarizeCustomerReviewsInputSchema},
  output: {schema: SummarizeCustomerReviewsOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing customer reviews and extracting key points.

  Reviews: {{{reviews}}}
  
  Please provide a concise summary of the reviews and extract the key points. The summary should capture the overall sentiment and common themes, and the key points should highlight specific aspects of the product or service that customers frequently mention. Return the summary and key points as a JSON object.`,
});

const summarizeCustomerReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeCustomerReviewsFlow',
    inputSchema: SummarizeCustomerReviewsInputSchema,
    outputSchema: SummarizeCustomerReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
