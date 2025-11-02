export type Publication = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImageId: string;
  releaseDate: string;
  pdfUrl?: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageId: string;
  publications: string[];
};

export type Review = {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Announcement = {
  id: string;
  title: string;
  date: string;
};

export const mockPublications: Publication[] = [
  {
    id: "1",
    title: "The Crimson Legacy",
    author: "A. R. Sterling",
    description: "An epic journey through a land of forgotten magic and ancient secrets. A young heir must reclaim their throne.",
    coverImageId: "pub-1",
    releaseDate: "2023-05-15",
    pdfUrl: "/sample.pdf",
  },
  {
    id: "2",
    title: "Echoes of the Past",
    author: "Dr. Evelyn Reed",
    description: "A historical deep-dive into the events that shaped the 20th century, with never-before-seen photographs.",
    coverImageId: "pub-2",
    releaseDate: "2022-11-01",
    pdfUrl: "/sample.pdf",
  },
  {
    id: "3",
    title: "The Alchemist's Secret",
    author: "Julian Cross",
    description: "A thrilling mystery where a determined detective uncovers a secret society hiding the key to eternal life.",
    coverImageId: "pub-3",
    releaseDate: "2024-01-20",
    pdfUrl: "/sample.pdf",
  },
];

export const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Rajesh Sharma",
    role: "Founder & Chief Editor",
    bio: "With over 30 years in the publishing industry, Rajesh founded Shivay Publications to bring compelling stories to the world.",
    imageId: "staff-1",
    publications: ["The Crimson Legacy"],
  },
  {
    id: "2",
    name: "Priya Singh",
    role: "Head of Acquisitions",
    bio: "Priya has a keen eye for talent and is dedicated to discovering the next generation of great authors.",
    imageId: "staff-2",
    publications: ["Echoes of the Past"],
  },
  {
    id: "3",
    name: "Amit Patel",
    role: "Marketing Director",
    bio: "Amit leads our marketing efforts, connecting our authors with readers globally through innovative campaigns.",
    imageId: "staff-3",
    publications: ["The Alchemist's Secret"],
  },
];

export const mockReviews: Review[] = [
  {
    id: "1",
    customerName: "Ananya Gupta",
    rating: 5,
    comment: "Shivay Publications has an incredible selection. 'The Crimson Legacy' was a masterpiece of fantasy writing!",
    date: "2023-06-20",
  },
  {
    id: "2",
    customerName: "Vikram Kumar",
    rating: 4,
    comment: "The submission process was smooth and the editorial team provided excellent feedback. Highly recommended for aspiring authors.",
    date: "2023-08-11",
  },
  {
    id: "3",
    customerName: "Sneha Reddy",
    rating: 5,
    comment: "I love the quality of the books. 'Echoes of the Past' is not only informative but beautifully designed.",
    date: "2023-01-05",
  },
   {
    id: "4",
    customerName: "Rohan Desai",
    rating: 3,
    comment: "Good collection, but I wish the website had more filtering options for genres. The books themselves are great, though.",
    date: "2024-02-18",
  },
];

export const mockAnnouncements: Announcement[] = [
    {
        id: "1",
        title: "Announcing the 2024 Shivay Literary Award nominations!",
        date: "2024-03-15",
    },
    {
        id: "2",
        title: "Call for Submissions: We are now accepting manuscripts for our new Sci-Fi imprint.",
        date: "2024-03-10",
    }
];
