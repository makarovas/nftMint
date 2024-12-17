'use client';

import { useToast } from '@/hooks/use-toast';
import { Toast, ToastDescription, ToastTitle } from './toast2';

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.type}>
          <ToastTitle>{toast.title}</ToastTitle>
          {toast.description && (
            <ToastDescription>{toast.description}</ToastDescription>
          )}
        </Toast>
      ))}
    </>
  );
}
