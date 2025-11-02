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
    title: "Self-Publishing Guide",
    author: "Shivay Team",
    description: "A comprehensive guide to self-publishing, from manuscript to market. Your story deserves to be told.",
    coverImageId: "pub-1",
    releaseDate: "2023-05-15",
    pdfUrl: "/sample.pdf",
  },
  {
    id: "2",
    title: "The Art of Book Marketing",
    author: "Marketing Experts",
    description: "Learn the secrets of book marketing and reach a global audience. Effective strategies for today's authors.",
    coverImageId: "pub-2",
    releaseDate: "2022-11-01",
    pdfUrl: "/sample.pdf",
  },
  {
    id: "3",
    title: "Mastering the Edit",
    author: "Editorial Team",
    description: "An in-depth look at the editing process. Turn your rough draft into a polished masterpiece.",
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
    bio: "With over 30 years in the publishing industry, Rajesh founded Shivay Publications to empower authors and bring their stories to the world.",
    imageId: "staff-1",
    publications: ["Self-Publishing Guide"],
  },
  {
    id: "2",
    name: "Priya Singh",
    role: "Head of Author Services",
    bio: "Priya has a keen eye for talent and is dedicated to guiding authors through their publishing journey.",
    imageId: "staff-2",
    publications: ["The Art of Book Marketing"],
  },
  {
    id: "3",
    name: "Amit Patel",
    role: "Marketing Director",
    bio: "Amit leads our marketing efforts, connecting our authors with readers globally through innovative campaigns.",
    imageId: "staff-3",
    publications: ["Mastering the Edit"],
  },
];

export const mockReviews: Review[] = [
  {
    id: "1",
    customerName: "A. P. J. ABDUL KALAM",
    rating: 5,
    comment: "It has been a great experience working with Shivay Publications. I am very happy with their services and would highly recommend them to all the authors.",
    date: "2023-06-20",
  },
  {
    id: "2",
    customerName: "SHIV KHERA",
    rating: 5,
    comment: "The team at Shivay Publications is very professional and cooperative. They have a very good understanding of the publishing industry.",
    date: "2023-08-11",
  },
  {
    id: "3",
    customerName: "CHETAN BHAGAT",
    rating: 5,
    comment: "I am very impressed with the quality of work and the dedication of the team at Shivay Publications. I would love to work with them again.",
    date: "2023-01-05",
  },
   {
    id: "4",
    customerName: "AMISH TRIPATHI",
    rating: 5,
    comment: "I had a great experience with Shivay Publications. They are very supportive and have a very good team of editors and designers.",
    date: "2024-02-18",
  },
];

export const mockAnnouncements: Announcement[] = [
    {
        id: "1",
        title: "Announcing our new 'Author Spotlight' series! Read about our talented writers.",
        date: "2024-03-15",
    },
    {
        id: "2",
        title: "Call for Submissions: We are now accepting manuscripts for our new Poetry collection.",
        date: "2024-03-10",
    }
];
