import { forwardRef } from 'react';
import { PinInput } from './PinInput';
import type { PinInputPresetProps, PinInputRef } from './types';

export const PinInputPreset = forwardRef<PinInputRef, PinInputPresetProps>(
  function PinInputPresetComponent(props, ref) {
    return <PinInput ref={ref} {...props} />;
  }
);
