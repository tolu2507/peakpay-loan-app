"use client";
import { useAuthStore } from "@/lib/store";
import { ReactNode } from "react";

export const Modal = ({ children }: { children: ReactNode }) => {
  const { modal, setModal } = useAuthStore();
  return (
    modal && (
      <div
        // onClick={() => setModal(false)}
        className="absolute inset-0 bg-black flex flex-row justify-center items-center">
        {children}
      </div>
    )
  );
};
