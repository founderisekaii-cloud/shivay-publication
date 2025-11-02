
import { firestore, isFirebaseEnabled } from './firebase-config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { mockStaff, type StaffMember, mockPublications, type Publication, mockReviews, type Review, mockAnnouncements, type Announcement } from './mock-data';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Generic fetcher function for server-side data fetching
async function fetchData<T>(collectionName: string, mockData: T[], orderField?: string): Promise<T[]> {
  if (!isFirebaseEnabled || !firestore) {
    return mockData;
  }
  try {
    const dataCollection = collection(firestore, collectionName);
    const dataQuery = orderField ? query(dataCollection, orderBy(orderField, 'desc')) : query(dataCollection);
    
    const snapshot = await getDocs(dataQuery);
    
    const dataList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
    
    return dataList.length > 0 ? dataList : mockData;
  } catch (error) {
    const permissionError = new FirestorePermissionError({
      path: collectionName,
      operation: 'list',
    });
    errorEmitter.emit('permission-error', permissionError);
    
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
