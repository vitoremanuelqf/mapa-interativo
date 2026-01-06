import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMember } from "@/features/institute/services/create-member";

interface CreateMemberInput {
  instituteId: string;
  uid: string;
  email: string;
  role?: "admin" | "editor" | "reader";
}

export default function useCreateMember() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateMemberInput) => {
      return await createMember(data);
    },

    onSuccess: (_data, variables) => {
      // 🔥 ESTA é a invalidação que faltava
      queryClient.invalidateQueries({
        queryKey: ["institute-members", variables.instituteId],
      });

      // opcionais (se você usa em outros lugares)
      queryClient.invalidateQueries({
        queryKey: ["institute", variables.instituteId],
      });

      queryClient.invalidateQueries({
        queryKey: ["institutes"],
      });
    },
  });

  return {
    createMember: mutation.mutate,
    createMemberAsync: mutation.mutateAsync,
    isCreatingMember: mutation.isPending,
    createMemberError: mutation.error,
  };
}
