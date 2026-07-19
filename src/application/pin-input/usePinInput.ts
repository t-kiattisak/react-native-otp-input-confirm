import { useContext } from 'react';
import { PinInputContext } from './PinInputContext';
import type { PinInputContextValue } from './types';

export function usePinInput(): PinInputContextValue {
  const context = useContext(PinInputContext);

  if (!context) {
    throw new Error('usePinInput must be used within PinInput');
  }

  return context;
}
