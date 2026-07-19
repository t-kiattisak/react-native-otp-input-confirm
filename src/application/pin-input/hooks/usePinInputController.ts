import { useCallback, useEffect, useRef, useState } from 'react';
import { getActiveFocusIndex } from '../../../domain/pin/pinFocus';
import type { PinLength, PinValue } from '../../../domain/pin/types';
import {
  blurTextInput,
  focusTextInput,
  setTextInputSelection,
  setTextInputValue,
  type PinTextInputRef,
} from '../utility/focusTextInput';
import {
  applyPinBackspace,
  applyPinChangeText,
  applySlotPress,
} from '../utility/pinInputActions';
import { triggerHaptic } from '../utility/triggerHaptic';

type UsePinInputControllerParams = {
  value: PinValue;
  onChange: (value: PinValue) => void;
  length?: PinLength;
  autoFocus?: boolean;
  disabled?: boolean;
  onComplete?: (value: PinValue) => void;
  hapticFeedback?: boolean;
};

export function usePinInputController({
  value,
  onChange,
  length = 6,
  autoFocus = false,
  disabled = false,
  onComplete,
  hapticFeedback = false,
}: UsePinInputControllerParams) {
  const inputRef = useRef<PinTextInputRef>(null);
  const [focusIndex, setFocusIndex] = useState(() =>
    getActiveFocusIndex(value, length)
  );
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    setFocusIndex(getActiveFocusIndex(value, length));
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && !disabled) {
      focusTextInput(inputRef.current);
      setIsInputFocused(true);
    }
  }, [autoFocus, disabled]);

  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);
  }, []);

  const handleComplete = useCallback(
    (completedValue: PinValue) => {
      if (hapticFeedback) {
        triggerHaptic();
      }

      onComplete?.(completedValue);
    },
    [hapticFeedback, onComplete]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      const nextFocusIndex = applyPinChangeText(text, {
        value,
        focusIndex,
        length,
        disabled,
        onChange,
        onComplete: handleComplete,
      });

      if (nextFocusIndex !== null) {
        setFocusIndex(nextFocusIndex);
      }
    },
    [disabled, focusIndex, handleComplete, length, onChange, value]
  );

  const handleKeyPress = useCallback(
    (event: { nativeEvent: { key: string } }) => {
      if (event.nativeEvent.key !== 'Backspace') {
        return;
      }

      const nextFocusIndex = applyPinBackspace({
        value,
        focusIndex,
        length,
        disabled,
        onChange,
        onComplete: handleComplete,
      });

      if (nextFocusIndex !== null) {
        setFocusIndex(nextFocusIndex);
      }
    },
    [disabled, focusIndex, handleComplete, length, onChange, value]
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

      setTextInputValue(inputRef.current, nextValue);
      focusTextInput(inputRef.current);
      setIsInputFocused(true);
      setFocusIndex(nextFocusIndex);
      setTextInputSelection(inputRef.current, nextFocusIndex, nextFocusIndex);
    },
    [disabled, onChange, value]
  );

  const focusInput = useCallback(() => {
    if (!disabled) {
      focusTextInput(inputRef.current);
      setIsInputFocused(true);
    }
  }, [disabled]);

  const blurInput = useCallback(() => {
    blurTextInput(inputRef.current);
    setIsInputFocused(false);
  }, []);

  const clearInput = useCallback(() => {
    if (!disabled) {
      onChange('');
      setFocusIndex(0);
      focusTextInput(inputRef.current);
      setIsInputFocused(true);
    }
  }, [disabled, onChange]);

  return {
    value,
    length,
    focusIndex,
    isInputFocused,
    disabled,
    inputRef,
    handleChangeText,
    handleKeyPress,
    handleSlotPress,
    handleInputFocus,
    handleInputBlur,
    focusInput,
    blurInput,
    clearInput,
  };
}
