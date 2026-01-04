import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInstitute } from "@/features/institute/services/create-institute";

interface CreateInstituteInput {
  institute: string;
  campus: string;
  uid: string;
}

export default function useCreateInstitute() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateInstituteInput) => {
      return await createInstitute(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["institutes", "admin"],
      });
    },
  });

  return {
    createInstitute: mutation.mutate,
    createInstituteAsync: mutation.mutateAsync,
    isCreatingInstitute: mutation.isPending,
    createInstituteError: mutation.error,
  };
}
