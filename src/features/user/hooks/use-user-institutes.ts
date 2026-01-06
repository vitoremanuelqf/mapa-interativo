import { useQuery } from "@tanstack/react-query";

import { getUserInstitutes } from "../services/get-user-institutes";
import { IInstitute } from "@/features/institute/models/institute";

interface UseUserInstitutesParams {
  instituteIds?: string[];
}

export function useUserInstitutes({
  instituteIds = [],
}: UseUserInstitutesParams) {
  return useQuery<IInstitute[]>({
    queryKey: ["user-institutes", instituteIds],
    queryFn: () => getUserInstitutes({ instituteIds }),
    enabled: instituteIds.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
