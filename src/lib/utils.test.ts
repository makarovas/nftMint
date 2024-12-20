import { cn } from './utils';

describe('cn utility', () => {
  it('should merge classnames correctly', () => {
    expect(cn('base', 'extra')).toBe('base extra');
    expect(cn('base', undefined)).toBe('base');
    expect(cn('base', null)).toBe('base');
    expect(cn('base', false && 'extra')).toBe('base');
    expect(cn('base', true && 'extra')).toBe('base extra');
  });
});
