import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/firebase/client";
import { setCookie } from "cookies-next/client";
import { handleAuthError } from "@/lib/auth/handle-auth-error";

export type TUserSignInProps = {
  email: string;
  password: string;
};

export const signIn = async ({
  email,
  password,
}: TUserSignInProps): Promise<void> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    const token = await res.user.getIdToken();

    if (!token) {
      throw new Error("Token not generated");
    }

    setCookie("token", token);
  } catch (err) {
    console.error("🚀 ~ signIn error:", err);
    handleAuthError(err);
  }
};
