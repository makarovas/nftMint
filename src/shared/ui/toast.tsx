'use client';

import { useToast } from '@/hooks/use-toast';

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg p-4 text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          <h4 className='font-medium'>{toast.title}</h4>
          {toast.description && <p className='text-sm'>{toast.description}</p>}
        </div>
      ))}
    </div>
  );
}
