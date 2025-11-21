"use client";

import { AuthView } from "@daveyplate/better-auth-ui";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="mt-2 text-gray-600">Create your account to get started</p>
        </div>
        <div className="better-auth-ui">
          <AuthView
            path="sign-up"
            localization={{
              SIGN_IN: "Sign In",
              SIGN_UP: "Sign Up",
            }}
          />
        </div>
      </div>
    </div>
  );
}