import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { PinLength, PinValue } from '../../domain/pin/types';

export type PinInputProps = {
  value: PinValue;
  onChange: (value: PinValue) => void;
  length?: PinLength;
  autoFocus?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  onComplete?: (value: PinValue) => void;
  testID?: string;
};

export type PinContainerProps = {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
};

export type PinSlotRenderProps = {
  index: number;
  isFocused: boolean;
  isFilled: boolean;
  valueInside: string;
};

export type PinSlotProps = {
  index: number;
  children: (props: PinSlotRenderProps) => ReactNode;
};

export type PinStickProps = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export type PinHiddenInputProps = {
  testID?: string;
};
