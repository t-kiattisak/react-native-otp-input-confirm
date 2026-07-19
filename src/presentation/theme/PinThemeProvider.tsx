import type { ReactNode } from 'react';
import { useContext } from 'react';
import { defaultPinTheme } from './defaultPinTheme';
import { mergePinTheme } from './mergePinTheme';
import { PinThemeContext } from './PinThemeContext';
import type { PinTheme } from './types';

type PinThemeProviderProps = {
  theme: PinTheme;
  children: ReactNode;
};

export function PinThemeProvider({ theme, children }: PinThemeProviderProps) {
  const parentTheme = useContext(PinThemeContext) ?? defaultPinTheme;
  const mergedTheme = mergePinTheme(parentTheme, theme);

  return (
    <PinThemeContext.Provider value={mergedTheme}>
      {children}
    </PinThemeContext.Provider>
  );
}
