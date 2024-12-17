'use client';

import { useCallback, useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'default' | null;

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  description?: string;
}

let toastCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      if (!mounted) return;

      const id = toastCounter++;
      setToasts((prev) => [...prev, { id, type, title, description }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 5000);
    },
    [mounted]
  );

  return {
    toasts,
    addToast,
  };
}
