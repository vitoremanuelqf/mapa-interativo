import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface CreateInstituteProps {
  institute: string;
  campus: string;
  uid: string;
}

export const createInstitute = async ({
  institute,
  campus,
  uid,
}: CreateInstituteProps) => {
  try {
    const institutesRef = collection(firestore, "institutes");

    const newInstituteRef = await addDoc(institutesRef, {
      institute,
      campus,
      members: [uid],
      roles: {
        [uid]: "admin",
      },
      createdAt: serverTimestamp(),
    });

    return newInstituteRef.id;
  } catch (err) {
    console.error("Erro ao criar instituto:", err);
    throw err;
  }
};
