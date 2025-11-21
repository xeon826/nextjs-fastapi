"use client";

import { authClient } from "@/lib/auth-client";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "./header";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      Link={Link}
    >
      <Header />
      {children}
    </AuthUIProvider>
  );
}