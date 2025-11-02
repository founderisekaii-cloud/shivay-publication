import { firestore, isFirebaseEnabled } from './firebase-config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { mockStaff, type StaffMember, mockPublications, type Publication, mockReviews, type Review, mockAnnouncements, type Announcement } from './mock-data';

// Generic fetcher function
async function fetchData<T>(collectionName: string, mockData: T[], orderField?: string): Promise<T[]> {
  if (!isFirebaseEnabled || !firestore) {
    return mockData;
  }
  
  try {
    const dataCollection = collection(firestore, collectionName);
    const dataQuery = orderField ? query(dataCollection, orderBy(orderField, 'desc')) : query(dataCollection);
    const dataSnapshot = await getDocs(dataQuery);
    const dataList = dataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
    return dataList.length > 0 ? dataList : mockData;
  } catch (error) {
    console.error(`Error fetching ${collectionName} from Firestore:`, error);
    return mockData; // Fallback to mock data on error
  }
}

export async function getStaff(): Promise<StaffMember[]> {
    return fetchData<StaffMember>('staff', mockStaff, 'name');
}

export async function getPublications(): Promise<Publication[]> {
    return fetchData<Publication>('publications', mockPublications, 'releaseDate');
}

export async function getReviews(): Promise<Review[]> {
    return fetchData<Review>('reviews', mockReviews, 'date');
}

export async function getAnnouncements(): Promise<Announcement[]> {
    return fetchData<Announcement>('announcements', mockAnnouncements, 'date');
}
