import { getActiveFocusIndex } from '../../../domain/pin/pinFocus';
import { isPinComplete, sanitizePinInput } from '../../../domain/pin/pinRules';
import type { PinLength, PinValue } from '../../../domain/pin/types';

type PinInputActionParams = {
  value: PinValue;
  focusIndex: number;
  length: PinLength;
  disabled?: boolean;
  onChange: (value: PinValue) => void;
  onComplete?: (value: PinValue) => void;
};

export function insertDigitAtFocus(
  value: PinValue,
  digit: string,
  focusIndex: number,
  length: PinLength
): PinValue {
  return (value.slice(0, focusIndex) + digit + value.slice(focusIndex)).slice(
    0,
    length
  );
}

function commitValue(
  nextValue: PinValue,
  length: PinLength,
  onChange: (value: PinValue) => void,
  onComplete?: (value: PinValue) => void
): number {
  onChange(nextValue);

  if (isPinComplete(nextValue, length)) {
    onComplete?.(nextValue);
  }

  return getActiveFocusIndex(nextValue, length);
}

export function applyPinChangeText(
  text: string,
  {
    value,
    focusIndex,
    length,
    disabled,
    onChange,
    onComplete,
  }: PinInputActionParams
): number | null {
  if (disabled) {
    return null;
  }

  const sanitized = sanitizePinInput(text, length);

  if (sanitized === value) {
    return getActiveFocusIndex(value, length);
  }

  if (sanitized.length < value.length) {
    return commitValue(sanitized, length, onChange, onComplete);
  }

  if (sanitized.startsWith(value) && sanitized.length === value.length + 1) {
    return commitValue(sanitized, length, onChange, onComplete);
  }

  if (sanitized.startsWith(value) && sanitized.length > value.length + 1) {
    return commitValue(sanitized, length, onChange, onComplete);
  }

  if (value.length === 0 && sanitized.length > 1) {
    return commitValue(sanitized, length, onChange, onComplete);
  }

  if (
    !sanitized.startsWith(value) &&
    sanitized.length > value.length &&
    value.length < length
  ) {
    const digit = sanitized[focusIndex] ?? sanitized[value.length];

    if (digit && /\d/.test(digit)) {
      const nextValue = insertDigitAtFocus(value, digit, focusIndex, length);
      return commitValue(nextValue, length, onChange, onComplete);
    }
  }

  if (sanitized.length - value.length > 1) {
    return commitValue(sanitized, length, onChange, onComplete);
  }

  return commitValue(sanitized, length, onChange, onComplete);
}

export function applyPinBackspace({
  value,
  focusIndex: _focusIndex,
  length,
  disabled,
  onChange,
  onComplete,
}: PinInputActionParams): number | null {
  if (disabled || value.length === 0) {
    return null;
  }

  const nextValue = value.slice(0, -1);
  return commitValue(nextValue, length, onChange, onComplete);
}

export type SlotPressResult = {
  nextValue: PinValue;
  nextFocusIndex: number;
};

export function applySlotPress(
  index: number,
  value: PinValue,
  disabled?: boolean
): SlotPressResult | null {
  if (disabled) {
    return null;
  }

  const nextFocusIndex = Math.min(index, value.length);
  const nextValue = index < value.length ? value.slice(0, index) : value;

  return { nextValue, nextFocusIndex };
}
