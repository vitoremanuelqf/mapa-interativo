import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/features/auth/stores/use-auth-store";

export function useRedirect(redirectTo = "/dashboard") {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);
}
