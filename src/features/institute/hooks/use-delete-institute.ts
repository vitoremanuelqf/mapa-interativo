import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteInstitute } from "@/features/institute/services/delete-institute";

interface DeleteInstituteInput {
  instituteId: string;
}

export default function useDeleteInstitute() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: DeleteInstituteInput) => {
      return await deleteInstitute(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["institutes", "admin"],
      });
    },
  });

  return {
    deleteInstitute: mutation.mutate,
    deleteInstituteAsync: mutation.mutateAsync,
    isDeletingInstitute: mutation.isPending,
    deleteInstituteError: mutation.error,
  };
}
