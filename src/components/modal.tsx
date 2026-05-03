"use client";
import { useGlobalStore } from "@/web-portable/store/useGlobalStore";
import { ReactNode } from "react";

export const Modal = ({ 
  children, 
  isOpen, 
  onClose 
}: { 
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}) => {
  const { isModalVisible, setModal } = useGlobalStore();
  
  const visible = isOpen !== undefined ? isOpen : isModalVisible;
  const handleClose = onClose || (() => setModal(false));

  if (!visible) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[9999] flex flex-row justify-center items-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative max-h-full overflow-y-auto flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
