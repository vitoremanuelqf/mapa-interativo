import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface ICreateUserProps {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
}

export const createUser = async ({
  uid,
  displayName,
  email,
  photoURL,
}: ICreateUserProps): Promise<void> => {
  try {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return;
    }

    await setDoc(userRef, {
      displayName,
      email,
      photoURL,
      role: "user",
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    throw err;
  }
};
