import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/stores/use-auth-store";

import { toast } from "sonner";

import { formatErrorMessages } from "@/lib/messages/format-error-messages";

export function useAuthErrorToast(
  context: "confirm-new-password" | "reset-password" | "sign-in" | "sign-up",
) {
  const { error, clearError } = useAuthStore();

  useEffect(() => {
    if (error?.code) {
      const errorMessage = formatErrorMessages(context, error.code);

      toast(errorMessage.title, {
        description: errorMessage.description,
        position: "top-right",
      });

      clearError();
    }
  }, [error, clearError, context]);
}
