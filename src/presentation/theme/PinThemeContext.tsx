import { createContext } from 'react';
import type { PinTheme } from './types';

export const PinThemeContext = createContext<PinTheme | null>(null);
