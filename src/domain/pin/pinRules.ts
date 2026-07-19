import type { PinLength, PinValue } from './types';

export function sanitizePinInput(raw: string, length: PinLength): PinValue {
  return raw.replace(/\D/g, '').slice(0, length);
}

export function isPinComplete(value: PinValue, length: PinLength): boolean {
  return value.length === length;
}

export function getCharAt(value: PinValue, index: number): string {
  return value[index] ?? '';
}
