import { confirmPasswordReset } from "firebase/auth";

import { auth } from "@/firebase/client";
import { handleAuthError } from "@/lib/auth/handle-auth-error";

export type TConfirmNewPasswordProps = {
  oobCode: string;
  newPassword: string;
};

export const confirmNewPassword = async ({
  oobCode,
  newPassword,
}: TConfirmNewPasswordProps): Promise<void> => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
  } catch (err) {
    console.error("🚀 ~ confirmNewPassword error:", err);
    handleAuthError(err);
  }
};
