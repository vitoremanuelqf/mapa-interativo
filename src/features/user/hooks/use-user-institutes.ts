import { useQuery } from "@tanstack/react-query";

import type { IInstitute } from "@/features/institute/models/institute";

import { getCollection } from "@/firebase/services/get-collection";

interface IUseUserInstitutesProps {
  uid: string;
}

export default function useUserInstitutes({ uid }: IUseUserInstitutesProps) {
  const { data, isLoading } = useQuery<IInstitute[]>({
    queryKey: ["institutes", uid],
    queryFn: async () => {
      const result = await getCollection<IInstitute>({
        path: "institutes",
        filters: [
          {
            field: "members",
            operator: "array-contains",
            value: uid,
          },
        ],
      });

      return result.documents;
    },
    enabled: !!uid,
  });

  return {
    institutes: data,
    isInstituteLoading: isLoading,
  };
}
