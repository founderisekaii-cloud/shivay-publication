import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
import type { Publication } from "./mock-data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | number) {
  return format(new Date(date), "MMMM d, yyyy");
}

export function groupPublicationsByYear(publications: Publication[]): Record<string, Publication[]> {
  return publications.reduce((acc, pub) => {
    const year = new Date(pub.releaseDate).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(pub);
    return acc;
  }, {} as Record<string, Publication[]>);
}
