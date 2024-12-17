import { locales } from '@/config/i18n';
import { ToastContainer } from '@/shared/ui/toast';
import { ToastProvider, ToastViewport } from '@radix-ui/react-toast';
import { Providers } from '../providers';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale}>
          <ToastProvider>
            {children}
            <ToastContainer />
            <ToastViewport />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
