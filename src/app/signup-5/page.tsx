"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WhiteLogo } from "@/components/Logo";
import { useAuthStore } from "@/lib/store";
import { Loader2, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";

export default function SignupStage5() {
  const router = useRouter();
  const { signupData, setSignupData } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const password = signupData.password || "";

  const requirements = [
    { label: "8 characters", met: password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Lowercase letter", met: /[a-z]/.test(password) },
    {
      label: "Special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    { label: "Number", met: /\d/.test(password) },
  ];

  const canProceed =
    requirements.every((r) => r.met) &&
    password === confirmPassword &&
    password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/signup-6");
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white">
      <section className="hidden md:flex relative flex-1 bg-[#F5F5F5] overflow-hidden">
        <Image
          src="/images/onboarding-hero.png"
          alt="Cheerful customer using Peakpay"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-10 left-10">
          <WhiteLogo />
        </div>
      </section>

      <section className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24">
        <div className="w-full max-w-2xl space-y-10">
          <h1 className="text-[22px] font-semibold text-gray-900 leading-tight">
            Create a secure password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Create password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) =>
                      setSignupData({ password: e.target.value })
                    }
                    className="w-full pl-4 pr-12 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Requirements Grid */}
                <div className="grid grid-cols-4 gap-x-4 gap-y-2 pt-2">
                  {requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {req.met ? (
                        <CheckCircle2 size={14} className="text-[#00A67E]" />
                      ) : (
                        <Circle size={14} className="text-red-400" />
                      )}
                      <span
                        className={`text-[12px] font-medium ${req.met ? "text-[#00A67E]" : "text-gray-500"}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Confirm password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-4 pr-12 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 font-medium">
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !canProceed}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center transition-all active:scale-[0.98]">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Password"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
