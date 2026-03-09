"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Congratulations } from "@/components/Logo";
import { useAuthStore } from "@/lib/store";

export default function SignupSuccess() {
  const router = useRouter();
  const { signupData } = useAuthStore();

  const fullName = `${signupData.firstName} ${signupData.lastName}`.trim();

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    // Auto-navigate to login after 6 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="scale-75 md:scale-100">
          <Congratulations />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
            Welcome to Peakpay, {fullName || "User"}!
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            You are all set up now!
          </p>
        </div>

        <p className="text-sm text-gray-400 font-medium pt-4">
          Redirecting to login...
        </p>
      </div>
    </main>
  );
}
