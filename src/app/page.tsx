"use client";

import Image from "next/image";
import Logo, { WhiteLogo } from "@/components/Logo";
import { ChevronDown } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";
import { useAuthStore } from "@/lib/store";

export default function OnboardingPage() {
  const { signupData, setSignupData } = useAuthStore();

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Column: Image (Hidden on small screens) */}
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

      {/* Right Column: Form */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24">
        <div className="w-full space-y-12">
          {/* Mobile Logo Visibility (Visible on small screens) */}
          <div className="md:hidden flex justify-center">
            <Logo variant="orange" className="w-10" />
          </div>

          {/* Intro Text */}
          <div className="text-center md:text-left space-y-4">
            <div className="hidden md:flex flex-col items-center gap-2">
              <Logo variant="orange" />
              <p className="text-gray-600 text-lg font-medium">
                Welcome to Peakpay
              </p>
            </div>

            <h1 className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-tight mt-50">
              Let&apos;s get you started on your financial journey
            </h1>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700">
                Phone number
              </label>
              <PhoneInput
                value={signupData.phone}
                dialCode={signupData.dialCode}
                onChange={(val) => setSignupData({ phone: val })}
                onDialCodeChange={(code) => setSignupData({ dialCode: code })}
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/signup-2";
              }}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 transition-all hover:scale-[1.01] active:scale-[0.99]">
              Get Started
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#00A67E] hover:text-[#008F6D] font-bold decoration-2 underline-offset-4 cursor-pointer">
              Log in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
