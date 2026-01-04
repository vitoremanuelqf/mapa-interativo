import { doc, deleteDoc } from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface DeleteInstituteProps {
  instituteId: string;
}

export const deleteInstitute = async ({
  instituteId,
}: DeleteInstituteProps) => {
  try {
    const instituteRef = doc(firestore, "institutes", instituteId);

    await deleteDoc(instituteRef);
  } catch (err) {
    console.error("Erro ao deletar instituto:", err);
    throw err;
  }
};
