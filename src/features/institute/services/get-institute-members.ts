// features/institute/services/get-institute-members.ts
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { firestore } from "@/firebase/client";
import { getDocumentByPath } from "@/firebase/services/get-document-by-path";
import { InstituteMember } from "../models/institute";
import { chunkArray } from "@/utils/chunk-array";

interface Institute {
  members: string[];
  roles: Record<string, InstituteMember["role"]>;
}

interface GetInstituteMembersParams {
  instituteId: string;
}

export async function getInstituteMembers({
  instituteId,
}: GetInstituteMembersParams): Promise<InstituteMember[]> {
  if (!instituteId) return [];

  const institute = await getDocumentByPath<Institute>({
    path: `institutes/${instituteId}`,
  });

  if (!institute || !institute.members?.length) {
    return [];
  }

  const memberIds = institute.members;

  // 🔹 Quebra em batches de 10
  const batches = chunkArray(memberIds, 10);

  const members: InstituteMember[] = [];

  for (const batch of batches) {
    const usersQuery = query(
      collection(firestore, "users"),
      where(documentId(), "in", batch),
    );

    const snapshot = await getDocs(usersQuery);

    snapshot.docs.forEach((doc) => {
      members.push({
        id: doc.id,
        displayName: doc.data().displayName,
        email: doc.data().email,
        role: institute.roles[doc.id],
      });
    });
  }

  return members;
}
