'use client';

import { useI18n } from '@/shared/i18n/hooks/use-translations';
import { MintSection } from '@/widgets/mint-section';
import { NFTSection } from '@/widgets/nft-section';

export default function Home() {
  const t = useI18n();

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-3xl font-bold'>{t('mint.title')}</h1>
          <p className='text-gray-600'>{t('mint.subtitle')}</p>
        </div>
        <MintSection />
        <NFTSection />
      </main>

      <div className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <footer className='text-sm text-gray-600'>{t('footer.built')}</footer>
      </div>
    </div>
  );
}
