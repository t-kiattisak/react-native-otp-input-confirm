import { useCallback, useEffect, useRef, useState } from 'react';
import { getActiveFocusIndex } from '../../domain/pin/pinFocus';
import type { PinLength, PinValue } from '../../domain/pin/types';
import { focusTextInput, type PinTextInputRef } from './focusTextInput';
import {
  applyPinBackspace,
  applyPinChangeText,
  applySlotPress,
} from './pinInputActions';

type UsePinInputControllerParams = {
  value: PinValue;
  onChange: (value: PinValue) => void;
  length?: PinLength;
  autoFocus?: boolean;
  disabled?: boolean;
  onComplete?: (value: PinValue) => void;
};

export function usePinInputController({
  value,
  onChange,
  length = 6,
  autoFocus = false,
  disabled = false,
  onComplete,
}: UsePinInputControllerParams) {
  const inputRef = useRef<PinTextInputRef>(null);
  const [focusIndex, setFocusIndex] = useState(() =>
    getActiveFocusIndex(value, length)
  );

  useEffect(() => {
    setFocusIndex(getActiveFocusIndex(value, length));
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && !disabled) {
      focusTextInput(inputRef.current);
    }
  }, [autoFocus, disabled]);

  const handleChangeText = useCallback(
    (text: string) => {
      const nextFocusIndex = applyPinChangeText(text, {
        value,
        length,
        disabled,
        onChange,
        onComplete,
      });

      if (nextFocusIndex !== null) {
        setFocusIndex(nextFocusIndex);
      }
    },
    [disabled, length, onChange, onComplete, value]
  );

  const handleKeyPress = useCallback(
    (event: { nativeEvent: { key: string } }) => {
      if (event.nativeEvent.key !== 'Backspace') {
        return;
      }

      const nextFocusIndex = applyPinBackspace({
        value,
        length,
        disabled,
        onChange,
        onComplete,
      });

      if (nextFocusIndex !== null) {
        setFocusIndex(nextFocusIndex);
      }
    },
    [disabled, length, onChange, onComplete, value]
  );

  const handleSlotPress = useCallback(
    (index: number) => {
      const result = applySlotPress(index, value, disabled);

      if (result === null) {
        return;
      }

      const { nextValue, nextFocusIndex } = result;

      if (nextValue !== value) {
        onChange(nextValue);
      }

      focusTextInput(inputRef.current);
      setFocusIndex(nextFocusIndex);
    },
    [disabled, onChange, value]
  );

  const focusInput = useCallback(() => {
    if (!disabled) {
      focusTextInput(inputRef.current);
    }
  }, [disabled]);

  return {
    value,
    length,
    focusIndex,
    disabled,
    inputRef,
    handleChangeText,
    handleKeyPress,
    handleSlotPress,
    focusInput,
  };
}
