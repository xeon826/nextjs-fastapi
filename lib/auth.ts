import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

// Create the auth instance
export const auth = betterAuth({
  database: {
    type: "sqlite",
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
  secret: process.env.AUTH_SECRET!,
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:3002"],
  plugins: [nextCookies()],
});