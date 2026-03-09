"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo, { WhiteLogo } from "@/components/Logo";
import PhoneInput from "@/components/PhoneInput";
import { useAuthStore } from "@/lib/store";
import { Loader2 } from "lucide-react";

export default function SignupStage2() {
  const router = useRouter();
  const { signupData, setSignupData } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [consented, setConsented] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !consented) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    router.push("/signup-3");
  };

  const handleInputChange = (field: string, value: any) => {
    setSignupData({ [field]: value });
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
                  value={signupData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  required
                  value={signupData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
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
                value={signupData.phone}
                dialCode={signupData.dialCode}
                onChange={(val) => handleInputChange("phone", val)}
                onDialCodeChange={(code) => handleInputChange("dialCode", code)}
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
                value={signupData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                value={signupData.howDidYouHear}
                onChange={(e) =>
                  handleInputChange("howDidYouHear", e.target.value)
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
                value={signupData.referralCode}
                onChange={(e) =>
                  handleInputChange("referralCode", e.target.value)
                }
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all"
              />
            </div>

            {/* Agreements */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
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
                  checked={consented}
                  onChange={(e) => setConsented(e.target.checked)}
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
              disabled={isLoading || !agreed || !consented}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all active:scale-[0.98]">
              {isLoading ? <Loader2 className="animate-spin" /> : "Proceed"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
