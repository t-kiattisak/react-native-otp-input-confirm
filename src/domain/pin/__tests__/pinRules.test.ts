import { describe, expect, it } from '@jest/globals';
import {
  getCharAt,
  isPinComplete,
  normalizePinLength,
  sanitizePinInput,
} from '../pinRules';

describe('pinRules', () => {
  it('falls back to a safe default for an invalid PIN length', () => {
    expect(normalizePinLength(0)).toBe(6);
    expect(normalizePinLength(-1)).toBe(6);
    expect(normalizePinLength(4.5)).toBe(6);
    expect(sanitizePinInput('1234567', 0)).toBe('123456');
  });

  it('sanitizes non-digit characters by default (numeric mode)', () => {
    expect(sanitizePinInput('a1b2c3', 6)).toBe('123');
  });

  it('sanitizes alphanumeric characters', () => {
    expect(sanitizePinInput('a1-b2_c3!@#', 6, 'alphanumeric')).toBe('a1b2c3');
  });

  it('sanitizes alpha-only characters', () => {
    expect(sanitizePinInput('a1b2c3!@#', 6, 'alpha')).toBe('abc');
  });

  it('transforms to uppercase with autoCapitalize="characters"', () => {
    expect(sanitizePinInput('a1b2c3', 6, 'alphanumeric', 'characters')).toBe(
      'A1B2C3'
    );
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
