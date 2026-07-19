import type { RefObject } from 'react';
import type { PinLength, PinValue } from '../../domain/pin/types';
import type { PinTextInputRef } from './focusTextInput';

export type PinInputContextValue = {
  value: PinValue;
  length: PinLength;
  focusIndex: number;
  disabled: boolean;
  secureTextEntry: boolean;
  inputRef: RefObject<PinTextInputRef | null>;
  handleChangeText: (text: string) => void;
  handleKeyPress: (event: { nativeEvent: { key: string } }) => void;
  handleSlotPress: (index: number) => void;
  focusInput: () => void;
};
