import { useContext } from 'react';
import { defaultPinTheme } from './defaultPinTheme';
import { mergePinTheme } from './mergePinTheme';
import { PinThemeContext } from './PinThemeContext';
import type { PinTheme, PinThemeOverrides } from './types';

export function usePinTheme(localOverrides?: PinThemeOverrides): PinTheme {
  const contextTheme = useContext(PinThemeContext);
  const baseTheme = contextTheme ?? defaultPinTheme;

  if (!localOverrides) {
    return baseTheme;
  }

  return mergePinTheme(baseTheme, localOverrides);
}
