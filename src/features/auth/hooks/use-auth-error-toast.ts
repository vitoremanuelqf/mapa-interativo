// hooks/use-auth-error-toast.ts
import { toast } from "sonner";
import { AuthErrorCustom } from "@/lib/auth/auth-error-custom";
import { formatErrorMessages } from "@/lib/messages/format-error-messages";

type AuthContext =
  | "confirm-new-password"
  | "reset-password"
  | "sign-in"
  | "sign-up";

export function useAuthErrorToast(context: AuthContext) {
  return (err: unknown) => {
    if (!(err instanceof AuthErrorCustom)) return;

    const errorMessage = formatErrorMessages(context, err.code);

    toast(errorMessage.title, {
      description: errorMessage.description,
      position: "top-right",
    });
  };
}
