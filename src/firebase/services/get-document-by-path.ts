import { doc, getDoc, type DocumentData } from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface GetDocumentOptions {
  path: string;
}

export const getDocumentByPath = async <T extends DocumentData>({
  path,
}: GetDocumentOptions): Promise<(T & { id: string }) | null> => {
  if (!path) {
    console.warn("Caminho da coleção não fornecido para getDocumentByPath.");
    return null;
  }

  try {
    const documentRef = doc(firestore, path);

    const documentSnap = await getDoc(documentRef);

    if (documentSnap.exists()) {
      return {
        ...(documentSnap.data() as T),
        id: documentSnap.id,
      };
    } else {
      console.warn(`Documento não encontrado em "${path}".`);

      return null;
    }
  } catch (err) {
    console.error(`Erro ao buscar documento em "${path}":`, err);

    throw err;
  }
};
