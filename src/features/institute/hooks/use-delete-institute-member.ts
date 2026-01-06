// features/institute/hooks/use-delete-member.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../services/delete-institute-member";

interface DeleteMemberInput {
  instituteId: string;
  uid: string;
}

export function useDeleteMember() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ instituteId, uid }: DeleteMemberInput) =>
      deleteMember({ instituteId, uid }),

    onSuccess: (_data, variables) => {
      // 🔄 Atualiza lista de membros
      queryClient.invalidateQueries({
        queryKey: ["institute-members", variables.instituteId],
      });

      // 🔄 Atualiza dados do instituto
      queryClient.invalidateQueries({
        queryKey: ["institute", variables.instituteId],
      });

      // 🔄 Atualiza institutos do usuário removido
      queryClient.invalidateQueries({
        queryKey: ["institutes", variables.uid],
      });
    },
  });

  return {
    deleteMember: mutation.mutate,
    deleteMemberAsync: mutation.mutateAsync,
    isDeletingMember: mutation.isPending,
    deleteMemberError: mutation.error,
  };
}
