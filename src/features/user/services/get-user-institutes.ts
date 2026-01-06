import { IInstitute } from "@/features/institute/models/institute";
import { getCollection } from "@/firebase/services/get-collection";

interface GetUserInstitutesParams {
  instituteIds: string[];
}

export const getUserInstitutes = async ({
  instituteIds,
}: GetUserInstitutesParams): Promise<IInstitute[]> => {
  if (!instituteIds.length) return [];

  // ⚠️ Firestore permite no máximo 10 itens no "in"
  const ids = instituteIds.slice(0, 10);

  const result = await getCollection<IInstitute>({
    path: "institutes",
    filters: [
      {
        field: "__name__",
        operator: "in",
        value: ids,
      },
    ],
  });

  return result.documents;
};
