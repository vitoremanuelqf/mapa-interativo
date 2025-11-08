"use client";

import { useAuthStore } from "@/features/auth/stores/use-auth-store";

export default function Dashboard() {
  const { user, signOut } = useAuthStore();
  console.log("🚀 ~ Home ~ user:", user);

  return (
    <div>
      <h1>Olá Dashboard!</h1>
      <p>{user ? user.displayName : ""}</p>

      {user && <button onClick={signOut}>Sair</button>}
    </div>
  );
}
