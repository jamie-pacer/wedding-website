"use client";

import { useState } from "react";
import { Heart, Mail, Lock, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate login - will be replaced with Supabase auth
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, accept any login
    console.log("Login attempt:", formData);
    
    // Redirect to dashboard
    router.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center px-6 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-blush)] rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-dusty-blue)] rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-dusty-blue)] to-[var(--color-slate-blue)] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-charcoal)]">
            Wedding Planner
          </h1>
          <p className="text-[var(--color-warm-gray)] mt-2">
            Sign in to manage your wedding
          </p>
        </div>

        {/* Login Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-[var(--color-charcoal)] font-medium text-sm"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)]" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-[var(--color-light-gray)] rounded-lg bg-white focus:border-[var(--color-dusty-blue)] transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-[var(--color-charcoal)] font-medium text-sm"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)]" />
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-[var(--color-light-gray)] rounded-lg bg-white focus:border-[var(--color-dusty-blue)] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-[var(--color-light-gray)] text-[var(--color-dusty-blue)] focus:ring-[var(--color-dusty-blue)]"
                />
                <span className="text-[var(--color-warm-gray)]">Remember me</span>
              </label>
              <a href="#" className="text-[var(--color-dusty-blue)] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[var(--color-text-light)] text-sm mt-8">
          Natalie & James Wedding • 24th October 2026
        </p>
      </div>
    </div>
  );
}

