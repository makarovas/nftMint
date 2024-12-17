'use client';

import { config } from '@/config/wagmi';
import messages from '@/shared/i18n/locales/en.json';
import { NextIntlClientProvider } from 'next-intl';
import { WagmiConfig } from 'wagmi';

export function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <WagmiConfig config={config}>{children}</WagmiConfig>
    </NextIntlClientProvider>
  );
}
