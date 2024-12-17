'use client';

import { Button } from '@/shared/ui/button';

type MintMethod = 'native' | 'erc20';

interface MintMethodProps {
  selected: MintMethod;
  onChange: (method: MintMethod) => void;
}

export function MintMethod({ selected, onChange }: MintMethodProps) {
  return (
    <div className='flex gap-2'>
      <Button
        variant={selected === 'native' ? 'default' : 'outline'}
        size='sm'
        onClick={() => onChange('native')}
        className='flex-1'
      >
        STT
      </Button>
      <Button
        variant={selected === 'erc20' ? 'default' : 'outline'}
        size='sm'
        onClick={() => onChange('erc20')}
        className='flex-1'
      >
        ERC20
      </Button>
    </div>
  );
}
