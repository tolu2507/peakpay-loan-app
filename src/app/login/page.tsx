"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WhiteLogo } from "@/components/Logo";
import { useAuthStore } from "@/lib/store";
import { Loader2, Eye, EyeOff, Mail, Phone, Lock } from "lucide-react";

type LoginMethod = "phone" | "email";

export default function LoginPage() {
  const router = useRouter();
  const { resetSignupData } = useAuthStore();
  const [method, setMethod] = useState<LoginMethod>("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear all onboarding data before navigating to dashboard
    resetSignupData();

    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* Hero Section */}
      <section className="hidden md:flex relative flex-1 bg-[#F5F5F5] overflow-hidden">
        <Image
          src="/images/onboarding-hero.png"
          alt="Peakpay Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-10 left-10">
          <WhiteLogo />
        </div>
      </section>

      {/* Login Form Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20">
        <div className="w-full max-w-sm space-y-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-500 font-medium">
              Log in to manage your account and loans
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-2xl">
            <button
              onClick={() => setMethod("phone")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                method === "phone"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              Phone Number
            </button>
            <button
              onClick={() => setMethod("email")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                method === "email"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              Email Address
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Identifier Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest pl-1">
                  {method === "phone" ? "Phone Number" : "Email Address"}
                </label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF8A00] transition-colors">
                    {method === "phone" ? (
                      <Phone size={18} />
                    ) : (
                      <Mail size={18} />
                    )}
                  </div>
                  <input
                    type={method === "phone" ? "tel" : "email"}
                    required
                    placeholder={
                      method === "phone" ? "080 0000 0000" : "name@example.com"
                    }
                    value={formData.identifier}
                    onChange={(e) =>
                      setFormData({ ...formData, identifier: e.target.value })
                    }
                    className="w-full h-[64px] pl-14 pr-5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-[#FF8A00] hover:text-[#E67C00]">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF8A00] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full h-[64px] pl-14 pr-14 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold h-[64px] rounded-2xl flex items-center justify-center transition-all active:scale-[0.98] shadow-lg shadow-orange-100 mt-4">
              {isLoading ? <Loader2 className="animate-spin" /> : "Log In"}
            </button>
          </form>

          <div className="pt-8 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link
                href="/signup-2"
                className="text-[#FF8A00] font-bold hover:text-[#E67C00] transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
