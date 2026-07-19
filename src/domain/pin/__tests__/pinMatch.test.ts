import { describe, expect, it } from '@jest/globals';
import { isPinMatch, shouldShowConfirmError } from '../pinMatch';

describe('pinMatch', () => {
  it('checks matching pins', () => {
    expect(isPinMatch('123456', '123456')).toBe(true);
    expect(isPinMatch('123456', '654321')).toBe(false);
  });

  it('shows confirm error only when confirm is complete and mismatched', () => {
    expect(shouldShowConfirmError('123456', '123455', 6, true)).toBe(true);
    expect(shouldShowConfirmError('123456', '12345', 6, true)).toBe(false);
    expect(shouldShowConfirmError('123456', '123455', 6, false)).toBe(false);
  });
});
