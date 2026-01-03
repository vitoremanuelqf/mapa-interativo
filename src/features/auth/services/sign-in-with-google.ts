import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "@/firebase/client";
import { setCookie } from "cookies-next/client";
import { handleAuthError } from "@/lib/auth/handle-auth-error";
import { createUser } from "@/features/user/services/create-user";

export const signInWithGoogle = async (): Promise<void> => {
  try {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);

    await createUser({
      uid: res.user.uid,
      displayName: res.user.displayName,
      email: res.user.email,
      photoURL: res.user.photoURL,
    });

    const token = await res.user.getIdToken();

    if (!token) {
      throw new Error("Token not generated");
    }

    setCookie("token", token);
  } catch (err) {
    console.error("🚀 ~ signInWithGoogle error:", err);
    handleAuthError(err);
  }
};
