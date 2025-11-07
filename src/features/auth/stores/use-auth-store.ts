import { create } from "zustand";

import { auth } from "@/firebase/client";

import * as FirebaseAuth from "firebase/auth";

import { getDocumentByPath } from "@/firebase/services/get-document-by-path";
import { createUser } from "@/features/user/services/create-user";

import { IUser } from "@/features/user/models/user";
import { ResetPasswordCredentials, SignInCredentials, SignUpCredentials } from "../models/credential";

type AuthStore = {
  user: IUser | null;
  error: FirebaseAuth.AuthError | null;

  isLoading: boolean;
  isAuthenticated: boolean;

  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: (credentials: SignInCredentials) => Promise<void>;
  signUpWithEmailAndPassword: (credentials: SignUpCredentials) => Promise<void>;
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => {
  const initialState: AuthStore = {
    user: null,
    error: null,

    isLoading: false,
    isAuthenticated: false,

    signInWithGoogle: async () => {},
    signInWithEmailAndPassword: async () => {},
    signUpWithEmailAndPassword: async () => {},
    resetPassword: async () => {},
    signOut: async () => {},
  };

  FirebaseAuth.onAuthStateChanged(auth, async (user) => {
    console.log("🚀 ~ user:", user)
    if (user?.uid) {
      let currentUser: IUser | null = await getDocumentByPath({
        path: `users/${user.uid}`,
      });

      if (!currentUser) {
        await createUser(user);

        currentUser = await getDocumentByPath({ path: `users/${user.uid}` });
      }

      set({ user: currentUser, isAuthenticated: !!currentUser });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  });

  return {
    ...initialState,
    signInWithGoogle: async () => {
      set({ isLoading: true, error: null });

      try {
        const provider = new FirebaseAuth.GoogleAuthProvider();
        const result = await FirebaseAuth.signInWithPopup(auth, provider);
        const token = await result.user.getIdToken();
        console.log("🚀 ~ token:", token);

        set({ error: null });
      } catch (error) {
        console.error("Erro ao fazer login com Google:", error);

        set({ error: error as FirebaseAuth.AuthError });
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
        console.log("🚀 ~ token:", token);

        set({ error: null });
      } catch (error) {
        console.error("Erro ao fazer login com email/senha:", error);

        set({ error: error as FirebaseAuth.AuthError });
      } finally {
        set({ isLoading: false });
      }
    },

    signUpWithEmailAndPassword: async (credentials: SignUpCredentials) => {
      console.log("🚀 ~ credentials:", credentials)
      set({ isLoading: true, error: null });

      try {
        const { user } = await FirebaseAuth.createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );
        await FirebaseAuth.updateProfile(user, { displayName: credentials.displayName });
        await createUser({
          uid: user.uid,
          displayName: credentials.displayName,
          email: user.email,
        });

        const token = await user.getIdToken();
        console.log("🚀 ~ token:", token);

        set({ error: null });
      } catch (error) {
        console.error("Erro ao criar conta:", error);

        set({ error: error as FirebaseAuth.AuthError });
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
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
