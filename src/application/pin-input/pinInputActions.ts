import { getActiveFocusIndex } from '../../domain/pin/pinFocus';
import { isPinComplete, sanitizePinInput } from '../../domain/pin/pinRules';
import type { PinLength, PinValue } from '../../domain/pin/types';

type PinInputActionParams = {
  value: PinValue;
  length: PinLength;
  disabled?: boolean;
  onChange: (value: PinValue) => void;
  onComplete?: (value: PinValue) => void;
};

export function applyPinChangeText(
  text: string,
  {
    value: _value,
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
  onChange(sanitized);

  if (isPinComplete(sanitized, length)) {
    onComplete?.(sanitized);
  }

  return getActiveFocusIndex(sanitized, length);
}

export function applyPinBackspace({
  value,
  length,
  disabled,
  onChange,
  onComplete,
}: PinInputActionParams): number | null {
  if (disabled || value.length === 0) {
    return null;
  }

  const nextValue = value.slice(0, -1);
  onChange(nextValue);

  if (isPinComplete(nextValue, length)) {
    onComplete?.(nextValue);
  }

  return getActiveFocusIndex(nextValue, length);
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
