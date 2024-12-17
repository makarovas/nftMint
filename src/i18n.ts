import { locales } from '@/config/i18n';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as 'en')) {
    return {
      messages: (await import(`./shared/i18n/locales/en.json`)).default,
      locale: 'en',
    };
  }

  return {
    messages: (await import(`./shared/i18n/locales/${locale}.json`)).default,
    locale,
  };
});

export async function getTranslations(locale: string) {
  return (await import(`./shared/i18n/locales/${locale}.json`)).default;
}

export async function getLocale(locale: string | undefined) {
  if (!locale) return 'en';
  return locales.includes(locale as 'en') ? locale : 'en';
}
