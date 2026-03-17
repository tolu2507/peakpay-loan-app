"use client";
import { useAuthStore } from "@/lib/store";
import { ReactNode } from "react";

export const Modal = ({ children }: { children: ReactNode }) => {
  const { modal, setModal } = useAuthStore();
  return (
    modal && (
      <div
        className="fixed inset-0 z-[9999] flex flex-row justify-center items-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}>
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="relative max-h-full overflow-y-auto flex items-center justify-center">
          {children}
        </div>
      </div>
    )
  );
};
