"use client";

import { useCallback, useRef, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(
    null
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = setTimeout(() => setToast(null), 4500);
  }, []);

  const clearToast = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setToast(null);
  }, []);

  return { toast, showToast, clearToast };
}
