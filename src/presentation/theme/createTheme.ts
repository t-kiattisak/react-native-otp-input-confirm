import { defaultPinTheme } from './defaultPinTheme';
import { mergePinTheme } from './mergePinTheme';
import type { PinTheme, PinThemeOverrides } from './types';

export function createTheme(overrides?: PinThemeOverrides): PinTheme {
  return mergePinTheme(defaultPinTheme, overrides);
}
