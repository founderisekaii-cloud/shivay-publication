"use server";

import { summarizeCustomerReviews, type SummarizeCustomerReviewsInput } from "@/ai/flows/summarize-customer-reviews";

export async function summarizeReviewsAction(input: SummarizeCustomerReviewsInput) {
  try {
    const result = await summarizeCustomerReviews(input);
    return { data: result };
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { error };
  }
}
