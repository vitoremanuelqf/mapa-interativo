// features/institute/hooks/use-get-institute-members.ts
import { useQuery } from "@tanstack/react-query";

import { getInstituteMembers } from "../services/get-institute-members";
import { UseGetInstituteMembersParams } from "../models/institute";

export function useGetInstituteMembers({
  instituteId,
}: UseGetInstituteMembersParams) {
  return useQuery({
    queryKey: ["institute-members", instituteId],
    queryFn: () => getInstituteMembers({ instituteId }),
    enabled: !!instituteId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
