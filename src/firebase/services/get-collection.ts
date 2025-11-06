import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  QueryConstraint,
  type DocumentData,
  QueryDocumentSnapshot,
  type WhereFilterOp,
} from "firebase/firestore";

import { firestore } from "@/firebase/client";

interface GetCollectionOptions {
  path: string;
  filters?: {
    field: string;
    operator: WhereFilterOp;
    value: unknown;
  }[];
  orderBy?: {
    field: string;
    direction?: "asc" | "desc";
  };
  limit?: number;
  startAfter?: QueryDocumentSnapshot<DocumentData>;
  endBefore?: QueryDocumentSnapshot<DocumentData>;
}

export interface CollectionResult<T> {
  documents: (T & { id: string })[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  firstVisible: QueryDocumentSnapshot<DocumentData> | null;
}

export const getCollection = async <T extends DocumentData>({
  path,
  filters,
  orderBy: orderByOption,
  limit: limitOption,
  startAfter: startAfterOption,
  endBefore: endBeforeOption,
}: GetCollectionOptions): Promise<CollectionResult<T>> => {
  if (!path) {
    console.warn("Caminho da coleção não fornecido para getCollection.");
    return { documents: [], lastVisible: null, firstVisible: null };
  }

  try {
    const collectionRef = collection(firestore, path);

    const queryConstraints: QueryConstraint[] = [
      ...(filters?.map((f) => where(f.field, f.operator, f.value)) || []),
      ...(orderByOption
        ? [orderBy(orderByOption.field, orderByOption.direction)]
        : []),
      ...(limitOption ? [limit(limitOption)] : []),
      ...(startAfterOption ? [startAfter(startAfterOption)] : []),
      ...(endBeforeOption ? [endBefore(endBeforeOption)] : []),
    ];

    const q = query(collectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));

    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const firstVisible = querySnapshot.docs[0] || null;

    return {
      documents,
      lastVisible,
      firstVisible,
    };
  } catch (err) {
    console.error(`Erro ao buscar coleção em "${path}":`, err);

    throw new Error(
      `Não foi possível carregar os documentos da coleção em "${path}".`,
    );
  }
};
