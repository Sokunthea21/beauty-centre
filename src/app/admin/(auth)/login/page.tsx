// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import AuthImage from "@/components/Login & Register/AuthImage";

// Reusable Icon components
const EyeIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    ></path>
  </svg>
);
const EyeOffIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057-5.064 7-9.542-7 .847 0 1.67.126 2.458.36M21 12c-1.274 4.057-5.064 7-9.542 7a10.05 10.05 0 01-1.425-.175M5.575 5.575a14.953 14.953 0 0112.85 12.85m-12.85 0L18.425 18.425"
    ></path>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user.emailVerified) {
        setError(
          "Please verify your email address before logging in. Check your inbox."
        );
        await auth.signOut();
        setLoading(false);
        return;
      }

      if (userCredential.user.email === "ngylyteng@gmail.com") {
        router.push("admin/dashboard");
      } else {
        router.push("/myacc");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "code" in err) {
        const errorWithCode = err as { code: string };
        if (errorWithCode.code === "auth/invalid-credential") {
          setError("Invalid email or password.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <AuthImage src="login-bg.jpg" alt="Pink cosmetics" />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember Me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition duration-300 disabled:bg-pink-300"
            >
              {loading ? "Logging in..." : "CONTINUE"}
            </button>
          </form>
          <div className="text-center my-4">
            <p className="text-sm text-gray-600">
              Need an Account?{" "}
              <Link
                href="/signup"
                className="font-medium text-pink-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
