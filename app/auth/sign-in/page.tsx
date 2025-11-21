"use client";

import { AuthView } from "@daveyplate/better-auth-ui";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-2 text-gray-600">Welcome back to your account</p>
        </div>
        <AuthView
          view="signIn"
          localization={{
            SIGN_IN: "Sign In",
            SIGN_UP: "Sign Up",
          }}
        />
      </div>
    </div>
  );
}