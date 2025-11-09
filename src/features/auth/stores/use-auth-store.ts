import { create } from "zustand";

import { auth } from "@/firebase/client";

import * as FirebaseAuth from "firebase/auth";

import { deleteCookie, setCookie } from "cookies-next/client";

import { createUser } from "@/features/user/services/create-user";

import { IUser } from "@/features/user/models/user";
import {
  ConfirmNewPasswordCredentials,
  ResetPasswordCredentials,
  SignInCredentials,
  SignUpCredentials,
} from "../models/credential";

type AuthStore = {
  user: IUser | null;

  error: FirebaseAuth.AuthError | null;
  clearError: () => void;

  isLoading: boolean;
  isAuthenticated: boolean;

  signInWithGoogle: () => Promise<FirebaseAuth.User>;
  signInWithEmailAndPassword: (
    credentials: SignInCredentials,
  ) => Promise<FirebaseAuth.User>;
  signUpWithEmailAndPassword: (
    credentials: SignUpCredentials,
  ) => Promise<FirebaseAuth.User>;
  confirmNewPassword: (
    credentials: ConfirmNewPasswordCredentials,
  ) => Promise<void>;
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => {
  const initialState: AuthStore = {
    user: null,

    error: null,
    clearError: () => set({ error: null }),

    isLoading: false,
    isAuthenticated: false,

    signInWithGoogle: async (): Promise<FirebaseAuth.User> => {
      throw new Error("Sign in with Google not implemented");
    },
    signInWithEmailAndPassword: async (): Promise<FirebaseAuth.User> => {
      throw new Error("Sign in with Email and Password not implemented");
    },
    signUpWithEmailAndPassword: async (): Promise<FirebaseAuth.User> => {
      throw new Error("Sign up with Email and Password not implemented");
    },
    signOut: async () => {},
    resetPassword: async () => {},
    confirmNewPassword: async () => {},
  };

  FirebaseAuth.onAuthStateChanged(auth, async (user) => {
    if (user?.uid) {
      const token = await user?.getIdToken();
      setCookie("token", token, { path: "/", secure: true });

      set({
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user?.photoURL,
        },
        isAuthenticated: !!user,
      });
    } else {
      set({ user: null, isAuthenticated: false });
      deleteCookie("token", { path: "/" });
    }
  });

  return {
    ...initialState,
    signInWithGoogle: async () => {
      set({ isLoading: true, error: null });

      try {
        const provider = new FirebaseAuth.GoogleAuthProvider();
        const { user } = await FirebaseAuth.signInWithPopup(auth, provider);

        await createUser({
          uid: user.uid,
        });

        const token = await user.getIdToken();
        setCookie("token", token, { path: "/", secure: true });

        set({ error: null });

        return user;
      } catch (error) {
        console.error("Erro ao fazer login com Google:", error);

        set({ error: error as FirebaseAuth.AuthError });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    signInWithEmailAndPassword: async (credentials: SignInCredentials) => {
      set({ isLoading: true, error: null });

      try {
        const { user } = await FirebaseAuth.signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );

        const token = await user.getIdToken();
        setCookie("token", token, { path: "/", secure: true });

        set({ error: null });

        return user;
      } catch (error) {
        console.error("Erro ao fazer login com email/senha:", error);

        set({ error: error as FirebaseAuth.AuthError });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    signUpWithEmailAndPassword: async (credentials: SignUpCredentials) => {
      set({ isLoading: true, error: null });

      try {
        const { user } = await FirebaseAuth.createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );
        await FirebaseAuth.updateProfile(user, {
          displayName: credentials.displayName,
        });

        await createUser({
          uid: user.uid,
        });

        const token = await user.getIdToken();
        setCookie("token", token, { path: "/", secure: true });

        set({
          error: null,
          user: {
            uid: user.uid,
            displayName: credentials.displayName,
            email: user.email,
            photoURL: user?.photoURL,
          },
        });

        return user;
      } catch (error) {
        console.error("Erro ao criar conta:", error);

        set({ error: error as FirebaseAuth.AuthError });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    resetPassword: async (credentials: ResetPasswordCredentials) => {
      set({ isLoading: true, error: null });

      try {
        await FirebaseAuth.sendPasswordResetEmail(auth, credentials.email);

        set({ error: null });
      } catch (error) {
        console.error("Erro ao enviar email de redefinição de senha:", error);

        set({ error: error as FirebaseAuth.AuthError });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    confirmNewPassword: async (credentials: ConfirmNewPasswordCredentials) => {
      set({ isLoading: true, error: null });

      try {
        await FirebaseAuth.confirmPasswordReset(
          auth,
          credentials.oobCode,
          credentials.password,
        );

        set({ error: null });
      } catch (error) {
        console.error("Erro ao redefinir senha:", error);

        set({ error: error as FirebaseAuth.AuthError });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    signOut: async () => {
      set({ isLoading: true, error: null });

      try {
        await FirebaseAuth.signOut(auth);

        set({ error: null });
      } catch (error) {
        console.error("Erro ao fazer logout:", error);

        set({ error: error as FirebaseAuth.AuthError });
        throw error;
      } finally {
        set({ isLoading: false });
        deleteCookie("token", { path: "/" });
      }
    },
  };
});
