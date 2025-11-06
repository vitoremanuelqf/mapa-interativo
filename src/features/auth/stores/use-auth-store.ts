import { create } from "zustand";

import { auth } from "@/firebase/client";

import * as FirebaseAuth from "firebase/auth";

import { getDocumentByPath } from "@/firebase/services/get-document-by-path";
import { createUser } from "@/features/user/services/create-user";

import { IUser } from "@/features/user/models/user";

type AuthStore = {
  user: IUser | null;
  error: FirebaseAuth.AuthError | null;

  isLoading: boolean;
  isAuthenticated: boolean;

  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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

    signInWithEmailAndPassword: async (email, password) => {
      set({ isLoading: true, error: null });

      try {
        const { user } = await FirebaseAuth.signInWithEmailAndPassword(
          auth,
          email,
          password,
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

    signUpWithEmailAndPassword: async (email, password, displayName) => {
      set({ isLoading: true, error: null });

      try {
        const { user } = await FirebaseAuth.createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await FirebaseAuth.updateProfile(user, { displayName });
        await createUser({
          uid: user.uid,
          displayName,
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

    resetPassword: async (email) => {
      set({ isLoading: true, error: null });

      try {
        await FirebaseAuth.sendPasswordResetEmail(auth, email);

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
