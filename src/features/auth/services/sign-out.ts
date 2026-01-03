import { signOut as firebaseSignOut } from "firebase/auth";
import { deleteCookie } from "cookies-next/client";

import { auth } from "@/firebase/client";
import { handleAuthError } from "@/lib/auth/handle-auth-error";

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    deleteCookie("token");
  } catch (err) {
    console.error("🚀 ~ signOut error:", err);
    handleAuthError(err);
  }
};
