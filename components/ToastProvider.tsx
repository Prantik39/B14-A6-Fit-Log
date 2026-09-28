"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#161922",
          color: "#ffffff",
          border: "1px solid #2a303c",
          borderRadius: "0.75rem",
          fontSize: "0.875rem",
        },
      }}
    />
  );
}
