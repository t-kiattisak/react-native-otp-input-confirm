import { getCharAt } from './pinRules';
import type { PinLength, PinValue, SlotState } from './types';

export function getActiveFocusIndex(
  value: PinValue,
  length: PinLength
): number {
  if (value.length >= length) {
    return length - 1;
  }

  return value.length;
}

export function getSlotState(
  value: PinValue,
  focusIndex: number,
  slotIndex: number,
  isInputFocused = true
): SlotState {
  const valueInside = getCharAt(value, slotIndex);

  return {
    isFocused: isInputFocused && focusIndex === slotIndex,
    isFilled: valueInside !== '',
    valueInside,
  };
}
