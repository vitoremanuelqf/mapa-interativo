"use client";

import { signOut } from "@/features/auth/services/sign-out";

export default function Dashboard() {
  return (
    <div>
      <h1>Olá Dashboard!</h1>
      <button
        onClick={async () => {
          await signOut();
        }}
      >
        Sair
      </button>
    </div>
  );
}
