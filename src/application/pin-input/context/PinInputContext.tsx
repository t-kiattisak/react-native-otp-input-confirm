import { createContext } from 'react';
import type { PinInputContextValue } from '../types';

export const PinInputContext = createContext<PinInputContextValue | null>(null);
