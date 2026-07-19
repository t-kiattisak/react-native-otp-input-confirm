import { describe, expect, it } from '@jest/globals';
import { getCharAt, isPinComplete, sanitizePinInput } from '../pinRules';

describe('pinRules', () => {
  it('sanitizes non-digit characters', () => {
    expect(sanitizePinInput('a1b2c3', 6)).toBe('123');
  });

  it('truncates input to length', () => {
    expect(sanitizePinInput('1234567890', 6)).toBe('123456');
  });

  it('handles paste with multiple digits', () => {
    expect(sanitizePinInput('123456', 4)).toBe('1234');
  });

  it('detects complete pin', () => {
    expect(isPinComplete('123456', 6)).toBe(true);
    expect(isPinComplete('12345', 6)).toBe(false);
  });

  it('returns character at index or empty string', () => {
    expect(getCharAt('123', 1)).toBe('2');
    expect(getCharAt('123', 5)).toBe('');
  });
});
