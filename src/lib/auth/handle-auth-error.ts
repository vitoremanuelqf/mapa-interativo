import type { AuthError } from "firebase/auth";
import { AuthErrorCustom } from "./auth-error-custom";

export function handleAuthError(err: unknown): never {
  if (typeof err === "object" && err !== null && "code" in err) {
    const { code } = err as AuthError;
    throw new AuthErrorCustom(code);
  }

  throw new AuthErrorCustom("unknown/error");
}
