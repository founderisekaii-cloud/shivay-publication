import { firebaseAuth, isFirebaseEnabled } from "./firebase-config";
import { 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut,
    type AuthError,
    type User,
    type NextOrObserver
} from "firebase/auth";

export async function signUpUser(email: string, password: string, displayName: string) {
    if (!isFirebaseEnabled || !firebaseAuth) {
        throw new Error("Firebase is not configured. Cannot sign up.");
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        await updateProfile(userCredential.user, { displayName });
        return userCredential.user;
    } catch (error) {
        const authError = error as AuthError;
        throw new Error(authError.message);
    }
}

export async function signInUser(email: string, password: string) {
    if (!isFirebaseEnabled || !firebaseAuth) {
        throw new Error("Firebase is not configured. Cannot sign in.");
    }
    try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        return userCredential.user;
    } catch (error) {
        const authError = error as AuthError;
        throw new Error(authError.message);
    }
}

export async function signOutUser() {
    if (!isFirebaseEnabled || !firebaseAuth) {
        throw new Error("Firebase is not configured. Cannot sign out.");
    }
    try {
        await signOut(firebaseAuth);
    } catch (error) {
        const authError = error as AuthError;
        throw new Error(authError.message);
    }
}

export function getAuthState(callback: NextOrObserver<User>) {
    if (!isFirebaseEnabled || !firebaseAuth) {
        return () => {}; // Return an empty unsubscribe function
    }
    return onAuthStateChanged(firebaseAuth, callback);
}
