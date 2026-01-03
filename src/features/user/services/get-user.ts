import { doc, getDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/firebase/client";

export interface IUserProfile {
  displayName: string | null;
  email: string | null;
  createdAt: Timestamp;
}

export const getUser = async (uid: string): Promise<IUserProfile | null> => {
  try {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.data() as IUserProfile;
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    throw err;
  }
};
