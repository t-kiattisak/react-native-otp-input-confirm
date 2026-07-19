import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type PinTheme = {
  root: ViewStyle;
  container: ViewStyle;
  slot: ViewStyle;
  slotContent: ViewStyle;
  slotFilled: ViewStyle;
  slotFocused: ViewStyle;
  slotError: ViewStyle;
  slotDisabled: ViewStyle;
  text: TextStyle;
  stick: ViewStyle;
  errorText: TextStyle;
};

export type PinThemeOverrides = Partial<PinTheme>;

export type PinThemeStyleProp =
  ViewStyle | TextStyle | StyleProp<ViewStyle> | StyleProp<TextStyle>;
