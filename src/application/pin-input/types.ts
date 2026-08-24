import type { RefObject } from 'react';
import type {
  AutoCapitalizeType,
  PinLength,
  PinType,
  PinValue,
} from '../../domain/pin/types';
import type { PinTextInputRef } from './utility/focusTextInput';

export type PinInputContextValue = {
  value: PinValue;
  length: PinLength;
  type: PinType;
  autoCapitalize: AutoCapitalizeType;
  focusIndex: number;
  isInputFocused: boolean;
  disabled: boolean;
  secureTextEntry: boolean;
  maskChar: string;
  maskDelay: number;
  maskAnimation: 'pop' | 'fade' | 'none';
  unmaskedIndex: number | null;
  toggleSecure: () => void;
  inputRef: RefObject<PinTextInputRef | null>;
  handleChangeText: (text: string) => void;
  handleKeyPress: (event: { nativeEvent: { key: string } }) => void;
  handleSlotPress: (index: number) => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  focusInput: () => void;
};
