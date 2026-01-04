import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "@/firebase/client";
import { handleAuthError } from "@/lib/auth/handle-auth-error";

export type TResetPasswordProps = {
  email: string;
};

export const resetPassword = async ({
  email,
}: TResetPasswordProps): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error("🚀 ~ resetPassword error:", err);
    handleAuthError(err);
  }
};
