"use client";

import { onIdTokenChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, deleteCookie } from "cookies-next/client";

import { auth } from "@/firebase/client";
import { getUser } from "@/features/user/services/get-user";

const AUTH_COOKIE_NAME = "token";

type TUserContext = {
  user: User | null;
  profile: any | null;
  isLoading: boolean;
};

type TUserContextProvider = {
  children: ReactNode;
};

const initialValue: TUserContext = {
  user: null,
  profile: null,
  isLoading: true,
};

export const UserContext = createContext<TUserContext>(initialValue);

export function UserProvider({ children }: TUserContextProvider) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const token = await currentUser.getIdToken();

          setCookie(AUTH_COOKIE_NAME, token, {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          });
          setUser(currentUser);

          const userProfile = await getUser(currentUser.uid);
          setProfile(userProfile);
        } else {
          deleteCookie(AUTH_COOKIE_NAME);
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Erro ao gerenciar token/cookie:", error);
        deleteCookie(AUTH_COOKIE_NAME);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
