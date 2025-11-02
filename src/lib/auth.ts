import { firebaseAuth, isFirebaseEnabled } from "./firebase-config";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, type AuthError } from "firebase/auth";

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
