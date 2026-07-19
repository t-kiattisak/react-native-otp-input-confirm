import { isPinComplete } from './pinRules';
import type { PinLength, PinValue } from './types';

export function isPinMatch(value: PinValue, confirmValue: PinValue): boolean {
  return value === confirmValue;
}

export function shouldShowConfirmError(
  value: PinValue,
  confirmValue: PinValue,
  length: PinLength,
  confirmTouched: boolean
): boolean {
  if (!confirmTouched) {
    return false;
  }

  if (!isPinComplete(confirmValue, length)) {
    return false;
  }

  return !isPinMatch(value, confirmValue);
}
