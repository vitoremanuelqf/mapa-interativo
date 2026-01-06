import {
  doc,
  runTransaction,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface CreateMemberProps {
  instituteId: string;
  uid: string;
  email: string;
  role?: "admin" | "editor" | "reader";
}

export const createMember = async ({
  instituteId,
  uid,
  role = "reader",
}: CreateMemberProps) => {
  try {
    const instituteRef = doc(firestore, "institutes", instituteId);
    const userRef = doc(firestore, "users", uid);

    await runTransaction(firestore, async (transaction) => {
      // 🔹 Atualiza o instituto
      transaction.update(instituteRef, {
        members: arrayUnion(uid),
        [`roles.${uid}`]: role,
        updatedAt: serverTimestamp(),
      });

      // 🔹 Atualiza o usuário
      transaction.update(userRef, {
        institutes: arrayUnion(instituteId),
        updatedAt: serverTimestamp(),
      });
    });
  } catch (err) {
    console.error("Erro ao adicionar membro ao instituto:", err);
    throw err;
  }
};
