import { collection, getDocs, query, where } from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface GetUserByEmailResult {
  uid: string;
  email: string;
  displayName?: string;
}

export async function getUserByEmail(
  email: string,
): Promise<GetUserByEmailResult | null> {
  const usersRef = collection(firestore, "users");

  const q = query(usersRef, where("email", "==", email));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];

  return {
    uid: doc.id,
    ...(doc.data() as Omit<GetUserByEmailResult, "uid">),
  };
}
