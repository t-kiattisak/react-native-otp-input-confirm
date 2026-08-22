import { useCallback, useEffect, useRef, useState } from 'react';
import { getActiveFocusIndex } from '../../../domain/pin/pinFocus';
import type {
  AutoCapitalizeType,
  PinLength,
  PinType,
  PinValue,
} from '../../../domain/pin/types';
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
  type SlotTapBehavior,
} from '../utility/pinInputActions';
import { triggerHaptic } from '../utility/triggerHaptic';

export type HapticType = 'complete' | 'change' | 'error';

export type UsePinInputControllerParams = {
  value: PinValue;
  onChange: (value: PinValue) => void;
  length?: PinLength;
  type?: PinType;
  autoCapitalize?: AutoCapitalizeType;
  autoFocus?: boolean;
  disabled?: boolean;
  onComplete?: (value: PinValue) => void;
  hapticFeedback?: boolean;
  onHaptic?: (type: HapticType) => void;
  blurOnComplete?: boolean;
  clearOnError?: boolean;
  error?: boolean;
  slotTapBehavior?: SlotTapBehavior;
};

export function usePinInputController({
  value,
  onChange,
  length = 6,
  type = 'numeric',
  autoCapitalize = 'none',
  autoFocus = false,
  disabled = false,
  onComplete,
  hapticFeedback = false,
  onHaptic,
  blurOnComplete = false,
  clearOnError = false,
  error = false,
  slotTapBehavior = 'truncate',
}: UsePinInputControllerParams) {
  const inputRef = useRef<PinTextInputRef>(null);
  const [focusIndex, setFocusIndex] = useState(() =>
    getActiveFocusIndex(value, length)
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const prevErrorRef = useRef(error);

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

  const blurInput = useCallback(() => {
    blurTextInput(inputRef.current);
    setIsInputFocused(false);
  }, []);

  const focusInput = useCallback(() => {
    if (!disabled) {
      focusTextInput(inputRef.current);
      setIsInputFocused(true);
    }
  }, [disabled]);

  const clearInput = useCallback(() => {
    if (!disabled) {
      onChange('');
      setFocusIndex(0);
      setTextInputValue(inputRef.current, '');
      focusTextInput(inputRef.current);
      setIsInputFocused(true);
    }
  }, [disabled, onChange]);

  // Handle clear on error and haptic error when error state transitions to true
  useEffect(() => {
    if (!prevErrorRef.current && error) {
      if (onHaptic) {
        onHaptic('error');
      } else if (hapticFeedback) {
        triggerHaptic();
      }

      if (clearOnError) {
        onChange('');
        setFocusIndex(0);
        setTextInputValue(inputRef.current, '');
      }
    }
    prevErrorRef.current = error;
  }, [clearOnError, error, hapticFeedback, onChange, onHaptic]);

  const handleComplete = useCallback(
    (completedValue: PinValue) => {
      if (onHaptic) {
        onHaptic('complete');
      } else if (hapticFeedback) {
        triggerHaptic();
      }

      if (blurOnComplete) {
        blurInput();
      }

      onComplete?.(completedValue);
    },
    [blurInput, blurOnComplete, hapticFeedback, onComplete, onHaptic]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      const nextFocusIndex = applyPinChangeText(text, {
        value,
        focusIndex,
        length,
        type,
        autoCapitalize,
        disabled,
        onChange,
        onComplete: handleComplete,
      });

      if (nextFocusIndex !== null) {
        setFocusIndex(nextFocusIndex);
        if (onHaptic) {
          onHaptic('change');
        }
      }
    },
    [
      autoCapitalize,
      disabled,
      focusIndex,
      handleComplete,
      length,
      onChange,
      onHaptic,
      type,
      value,
    ]
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
      const result = applySlotPress(index, value, disabled, slotTapBehavior);

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
    [disabled, onChange, slotTapBehavior, value]
  );

  return {
    value,
    length,
    type,
    autoCapitalize,
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
