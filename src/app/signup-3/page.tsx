"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WhiteLogo } from "@/components/Logo";
import { useAuthStore } from "@/lib/store";
import { Loader2, RotateCcw } from "lucide-react";

export default function SignupStage3() {
  const router = useRouter();
  const { signupData } = useAuthStore();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(116); // 01:56 in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => !digit)) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/signup-5");
  };

  const maskedPhone = `${signupData.dialCode}${signupData.phone.slice(0, 3)}****${signupData.phone.slice(-3)}`;
  const maskedEmail = `${signupData.email.slice(0, 2)}******${signupData.email.slice(signupData.email.indexOf("@") - 2)}`;

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
        <div className="w-full max-w-md space-y-5">
          <div className="space-y-4">
            <h1 className="text-[22px] font-bold text-gray-900 leading-tight">
              Verify your account
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              We have just sent a 6-digit code to your phone number{" "}
              <span className="text-gray-900 font-bold">{maskedPhone}</span> and
              email address{" "}
              <span className="text-gray-900 font-bold">{maskedEmail}</span>.
              Enter it here.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="space-y-4 text-left">
              <label className="text-sm font-bold text-gray-700">OTP</label>
              <div className="flex gap-2 sm:gap-4 justify-between mt-1">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 sm:w-14 sm:h-14 text-center text-2xl font-bold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all bg-white"
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-500">
                Resend code in {formatTime(timer)}
              </p>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
                <RotateCcw size={16} />
                Didn&apos;t get a code?{" "}
                <span className="text-[#FF8A00]">Resend OTP via SMS</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
                <RotateCcw size={16} />
                Having trouble with SMS?{" "}
                <span className="text-[#FF8A00]">Resend OTP via email</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.some((digit) => !digit)}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all active:scale-[0.98]">
              {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
