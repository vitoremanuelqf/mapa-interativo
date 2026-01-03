import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "@/firebase/client";
import { setCookie } from "cookies-next/client";
import { handleAuthError } from "@/lib/auth/handle-auth-error";
import { createUser } from "@/features/user/services/create-user";

export type TUserSignUpProps = {
  displayName: string;
  email: string;
  password: string;
};

export const signUp = async ({
  displayName,
  email,
  password,
}: TUserSignUpProps): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, { displayName });

    await createUser({
      uid: res.user.uid,
      displayName,
      email: res.user.email,
    });

    const token = await res.user.getIdToken();

    if (!token) {
      throw new Error("Token not generated");
    }

    setCookie("token", token);
  } catch (err) {
    console.error("🚀 ~ signUp error:", err);
    handleAuthError(err);
  }
};
