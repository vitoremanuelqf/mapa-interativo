import { useQuery } from "@tanstack/react-query";

import type { IInstitute } from "@/features/institute/models/institute";

import { getCollection } from "@/firebase/services/get-collection";

export default function useInstitutes() {
  const { data, isLoading } = useQuery<IInstitute[]>({
    queryKey: ["institutes", "admin"],
    queryFn: async () => {
      const result = await getCollection<IInstitute>({
        path: "institutes",
      });

      return result.documents;
    },
  });

  return {
    institutes: data,
    isInstitutesLoading: isLoading,
  };
}
