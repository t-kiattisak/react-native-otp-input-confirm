import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type PinContainerProps = {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
  accessibilityElementsHidden?: boolean;
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
  accessibilityLabel?: string;
  accessibilityHint?: string;
};
