import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface ICreateUserProps {
  uid: string;
}

interface IUser {
  createdAt: Timestamp;
}

export const createUser = async (user: ICreateUserProps): Promise<IUser> => {
  try {
    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as IUser;
    }

    await setDoc(userRef, {
      createdAt: serverTimestamp(),
    });

    return { createdAt: serverTimestamp() as Timestamp };
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    throw err;
  }
};
