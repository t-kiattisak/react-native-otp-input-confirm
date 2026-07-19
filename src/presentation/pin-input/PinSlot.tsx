import { Pressable } from 'react-native';
import { getSlotState } from '../../domain/pin/pinFocus';
import { usePinInput } from '../../application/pin-input/usePinInput';
import type { PinSlotProps } from './componentTypes';

export function PinSlot({ index, children }: PinSlotProps) {
  const { value, focusIndex, isInputFocused, handleSlotPress } = usePinInput();
  const slotState = getSlotState(value, focusIndex, index, isInputFocused);

  return (
    <Pressable onPress={() => handleSlotPress(index)}>
      {children({
        index,
        ...slotState,
      })}
    </Pressable>
  );
}
