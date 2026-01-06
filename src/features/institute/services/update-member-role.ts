// features/institute/services/update-member-role.ts
import {
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { firestore } from "@/firebase/client";

export type InstituteMemberRole = "admin" | "editor" | "reader";

interface UpdateMemberRoleProps {
  instituteId: string;
  uid: string;
  role: InstituteMemberRole;
}

export const updateMemberRole = async ({
  instituteId,
  uid,
  role,
}: UpdateMemberRoleProps) => {
  try {
    const instituteRef = doc(firestore, "institutes", instituteId);

    await runTransaction(firestore, async (transaction) => {
      transaction.update(instituteRef, {
        [`roles.${uid}`]: role,
        updatedAt: serverTimestamp(),
      });
    });
  } catch (err) {
    console.error("Erro ao atualizar permissão do membro:", err);
    throw err;
  }
};
