import { Timestamp } from "firebase/firestore";

export interface IUser {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}
