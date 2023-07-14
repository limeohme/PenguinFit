import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updatePassword, updateEmail } from 'firebase/auth';
import { auth } from '../config/firebase-config';

export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInUser(email, password) {
  // add funcs as params
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  return signOut(auth);
}

export function userUpdate(name = '') {
  return updateProfile(auth.currentUser, {
    displayName: name
  });
}

export function changePassword(newPassword) {
  return updatePassword(auth.currentUser, newPassword);
}

export function changeEmail(newEmail) {
  return updateEmail(auth.currentUser, newEmail);
}
