"use client";

import { authClient } from "@/lib/auth-client";
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <Link href="/auth/sign-in" className="text-sm font-medium hover:underline">
          Sign In
        </Link>
        <Link href="/auth/sign-up">
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}