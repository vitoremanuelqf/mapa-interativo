import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface createUserProps {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
}

export const createUser = async (user: createUserProps): Promise<void> => {
  try {
    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return;
    }

    await setDoc(userRef, {
      displayName: user.displayName,
      email: user.email,
      photoURL: user?.photoURL,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    throw err;
  }
};
