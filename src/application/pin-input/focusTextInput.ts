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
