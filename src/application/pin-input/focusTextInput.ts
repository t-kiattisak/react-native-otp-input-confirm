import type { ComponentRef } from 'react';
import { TextInput } from 'react-native';

export type PinTextInputRef = ComponentRef<typeof TextInput>;

export function focusTextInput(input: unknown): void {
  if (
    input &&
    typeof input === 'object' &&
    'focus' in input &&
    typeof input.focus === 'function'
  ) {
    input.focus();
  }
}

export function blurTextInput(input: unknown): void {
  if (
    input &&
    typeof input === 'object' &&
    'blur' in input &&
    typeof input.blur === 'function'
  ) {
    input.blur();
  }
}

export function setTextInputSelection(
  input: unknown,
  start: number,
  end: number
): void {
  if (
    input &&
    typeof input === 'object' &&
    'setSelection' in input &&
    typeof input.setSelection === 'function'
  ) {
    input.setSelection(start, end);
  }
}

export function setTextInputValue(input: unknown, text: string): void {
  if (
    input &&
    typeof input === 'object' &&
    'setNativeProps' in input &&
    typeof input.setNativeProps === 'function'
  ) {
    input.setNativeProps({ text });
  }
}
