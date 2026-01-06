import {
  doc,
  runTransaction,
  arrayRemove,
  serverTimestamp,
  deleteField,
} from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface DeleteMemberProps {
  instituteId: string;
  uid: string;
}

export const deleteMember = async ({ instituteId, uid }: DeleteMemberProps) => {
  try {
    const instituteRef = doc(firestore, "institutes", instituteId);
    const userRef = doc(firestore, "users", uid);

    await runTransaction(firestore, async (transaction) => {
      // 🔹 Atualiza o instituto
      transaction.update(instituteRef, {
        members: arrayRemove(uid),
        [`roles.${uid}`]: deleteField(),
        updatedAt: serverTimestamp(),
      });

      // 🔹 Atualiza o usuário
      transaction.update(userRef, {
        institutes: arrayRemove(instituteId),
        updatedAt: serverTimestamp(),
      });
    });
  } catch (err) {
    console.error("Erro ao remover membro do instituto:", err);
    throw err;
  }
};
