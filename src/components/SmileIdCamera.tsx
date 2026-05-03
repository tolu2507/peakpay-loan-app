"use client";

import React, { useEffect, useRef } from "react";
import "@smileid/web-components/smart-camera-web";

const SelfieCaptureScreens = "selfie-capture-screens" as any;

export interface SmileIdCameraProps {
  onPublish: (detail: any) => void;
  onCancel: () => void;
  onBack: () => void;
}

export default function SmileIdCamera({ onPublish, onCancel, onBack }: SmileIdCameraProps) {
  const cameraRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cameraRef.current;
    if (!el) return;

    const handlePublish = (e: any) => {
      onPublish(e.detail);
    };

    const handleCancel = () => {
      onCancel();
    };

    const handleBack = () => {
      onBack();
    };

    el.addEventListener("selfie-capture-screens.publish", handlePublish);
    el.addEventListener("selfie-capture-screens.cancelled", handleCancel);
    el.addEventListener("selfie-capture-screens.back", handleBack);

    return () => {
      el.removeEventListener("selfie-capture-screens.publish", handlePublish);
      el.removeEventListener("selfie-capture-screens.cancelled", handleCancel);
      el.removeEventListener("selfie-capture-screens.back", handleBack);
    };
  }, [onPublish, onCancel, onBack]);

  return (
    <div className="w-full h-[600px] bg-white rounded-3xl overflow-hidden relative">
      <SelfieCaptureScreens 
        ref={cameraRef} 
        theme-color="#FF8A00"
      ></SelfieCaptureScreens>
    </div>
  );
}
