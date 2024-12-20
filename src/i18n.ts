import { locales } from '@/config/i18n';
import { useLocale, useTimeZone } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = useLocale();
  const timeZone = useTimeZone();

  if (!locale || !locales.includes(locale as 'en')) {
    return {
      messages: (await import(`./shared/i18n/locales/en.json`)).default,
      locale: 'en',
      timeZone,
    };
  }

  return {
    messages: (await import(`./shared/i18n/locales/${locale}.json`)).default,
    locale,
    timeZone,
  };
});
