"use client";

import { useState } from "react";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords don't match");
          setIsLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          setIsLoading(false);
          return;
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (signUpError) throw signUpError;

        if (data?.user?.identities?.length === 0) {
          setError("An account with this email already exists");
          setIsLoading(false);
          return;
        }

        setSuccess("Account created! Check your email to verify.");
        setFormData({ email: "", password: "", confirmPassword: "" });
        
        setTimeout(() => {
          setIsSignUp(false);
          setSuccess("");
        }, 2000);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;

        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-lg font-semibold">N&J</span>
          </div>
          <h1 className="text-xl font-semibold text-slate-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Guest Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isSignUp ? "Create an account" : "Sign in to continue"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 text-sm">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-0 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-0 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-0 focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {isSignUp ? "Creating..." : "Signing in..."}
                </>
              ) : (
                <>
                  {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  {isSignUp ? "Create Account" : "Sign In"}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <span className="text-sm text-slate-500">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setSuccess("");
                setFormData({ email: "", password: "", confirmPassword: "" });
              }}
              className="text-sm font-medium text-slate-900 hover:text-slate-700 transition-colors"
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Natalie & James Wedding • 24th October 2026
        </p>
      </div>
    </div>
  );
}
