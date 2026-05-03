"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WhiteLogo } from "@/components/Logo";
import PhoneInput from "@/components/PhoneInput";
import { useSignupStore } from "@/web-portable/store/useSignupStore";
import { Loader2, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";

export default function SignupStage2() {
  const router = useRouter();
  const {
    form,
    setFormField,
    agreedTerms,
    setAgreedTerms,
    agreedPrivacy,
    setAgreedPrivacy,
    isLoading,
    register,
    error
  } = useSignupStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = form.password || "";
  const confirmPassword = form.confirmPassword || "";

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
    password.length > 0 &&
    agreedTerms &&
    agreedPrivacy;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed) return;
    try {
      await register();
      router.push("/signup-3");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Column: Image */}
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

      {/* Right Column: Multi-field Form */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-2xl py-10 space-y-8">
          <div className="space-y-2">
            <h1 className="text-[24px] font-bold text-gray-900">
              Let&apos;s get you started on your financial journey
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              We will use the details to verify your account. Please enter all
              these details correctly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Name Grid */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                What is your name?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  required
                  value={form.firstName}
                  onChange={(e) =>
                    setFormField("firstName", e.target.value)
                  }
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  required
                  value={form.lastName}
                  onChange={(e) =>
                    setFormField("lastName", e.target.value)
                  }
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                Phone number
              </label>
              <PhoneInput
                value={form.phone}
                dialCode={"+234"} // Default dial code
                onChange={(val) => setFormField("phone", val)}
                onDialCodeChange={() => { }} // Not handled in current SignupStore
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                Email address
              </label>
              <input
                type="email"
                placeholder="email@domain.ng"
                required
                value={form.email}
                onChange={(e) => setFormField("email", e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
              />
            </div>

            {/* Referral Info */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                How did you hear about us?
              </label>
              <select
                required
                value={form.howDidYouHear}
                onChange={(e) =>
                  setFormField("howDidYouHear", e.target.value)
                }
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none bg-white focus:ring-2 focus:ring-[#FF8A00] appearance-none">
                <option value="">Select an option</option>
                <option value="Friend">Friend</option>
                <option value="Social Media">Social Media</option>
                <option value="Google">Google</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                Referral code (optional)
              </label>
              <input
                type="text"
                placeholder="123456"
                value={form.referralCode}
                onChange={(e) =>
                  setFormField("referralCode", e.target.value)
                }
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
              />
            </div>

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
                      setFormField("password", e.target.value)
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 pt-2">
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
                    onChange={(e) => setFormField("confirmPassword", e.target.value)}
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

            {/* Agreements */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#FF8A00] focus:ring-[#FF8A00]"
                />
                <span className="text-xs text-gray-600 mt-1">
                  I have read and agree to Peakpay&apos;s{" "}
                  <span className="text-[#00A67E] font-bold">
                    Terms and Conditions
                  </span>
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedPrivacy}
                  onChange={(e) => setAgreedPrivacy(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#FF8A00] focus:ring-[#FF8A00]"
                />
                <span className="text-xs text-gray-600 mt-1">
                  I consent to Peakpay&apos;s{" "}
                  <span className="text-[#00A67E] font-bold">
                    Privacy Policy
                  </span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !canProceed}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all active:scale-[0.98]">
              {isLoading ? <Loader2 className="animate-spin" /> : "Proceed"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
