import type { RefObject } from 'react';
import type { PinLength, PinValue } from '../../domain/pin/types';
import type { PinTextInputRef } from './utility/focusTextInput';

export type PinInputContextValue = {
  value: PinValue;
  length: PinLength;
  focusIndex: number;
  isInputFocused: boolean;
  disabled: boolean;
  secureTextEntry: boolean;
  maskChar: string;
  inputRef: RefObject<PinTextInputRef | null>;
  handleChangeText: (text: string) => void;
  handleKeyPress: (event: { nativeEvent: { key: string } }) => void;
  handleSlotPress: (index: number) => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  focusInput: () => void;
};
