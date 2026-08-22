import type { AutoCapitalizeType, PinLength, PinType, PinValue } from './types';

export function sanitizePinInput(
  raw: string,
  length: PinLength,
  type: PinType = 'numeric',
  autoCapitalize: AutoCapitalizeType = 'none'
): PinValue {
  let cleaned = raw;

  if (type === 'numeric') {
    cleaned = cleaned.replace(/\D/g, '');
  } else if (type === 'alpha') {
    cleaned = cleaned.replace(/[^a-zA-Z]/g, '');
  } else if (type === 'alphanumeric') {
    cleaned = cleaned.replace(/[^a-zA-Z0-9]/g, '');
  }

  if (autoCapitalize === 'characters') {
    cleaned = cleaned.toUpperCase();
  }

  return cleaned.slice(0, length);
}

export function isPinComplete(value: PinValue, length: PinLength): boolean {
  return value.length === length;
}

export function getCharAt(value: PinValue, index: number): string {
  return value[index] ?? '';
}
