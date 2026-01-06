// features/institute/hooks/use-update-member-role.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateMemberRole,
  type InstituteMemberRole,
} from "../services/update-member-role";

interface UpdateMemberRoleInput {
  instituteId: string;
  uid: string;
  role: InstituteMemberRole;
}

export function useUpdateMemberRole() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateMemberRoleInput) =>
      updateMemberRole(data),

    onSuccess: (_data, variables) => {
      // 🔄 Atualiza lista de membros
      queryClient.invalidateQueries({
        queryKey: ["institute-members", variables.instituteId],
      });

      // 🔄 Atualiza o instituto
      queryClient.invalidateQueries({
        queryKey: ["institute", variables.instituteId],
      });
    },
  });

  return {
    updateMemberRole: mutation.mutate,
    updateMemberRoleAsync: mutation.mutateAsync,
    isUpdatingMemberRole: mutation.isPending,
    updateMemberRoleError: mutation.error,
  };
}
