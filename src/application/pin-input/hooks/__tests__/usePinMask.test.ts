import { describe, expect, it } from '@jest/globals';
import { usePinMask } from '../usePinMask';

describe('usePinMask Hook and Masking Logic', () => {
  it('exports usePinMask function', () => {
    expect(typeof usePinMask).toBe('function');
  });
});
