import { useCallback, useEffect, useRef, useState } from 'react';
import type { PinValue } from '../../../domain/pin/types';

export type UsePinMaskParams = {
  value: PinValue;
  secureTextEntry?: boolean;
  maskDelay?: number;
  onToggleSecure?: (isSecure: boolean) => void;
};

export function usePinMask({
  value,
  secureTextEntry = false,
  maskDelay = 0,
  onToggleSecure,
}: UsePinMaskParams) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [unmaskedIndex, setUnmaskedIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevValueRef = useRef<PinValue>(value);

  // Synchronize when secureTextEntry prop changes from parent
  useEffect(() => {
    setIsSecure(secureTextEntry);
  }, [secureTextEntry]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const prevLength = prevValueRef.current.length;
    const currentLength = value.length;

    if (isSecure && maskDelay > 0 && currentLength > prevLength) {
      const newlyTypedIndex = currentLength - 1;
      setUnmaskedIndex(newlyTypedIndex);

      clearTimer();
      timerRef.current = setTimeout(() => {
        setUnmaskedIndex(null);
        timerRef.current = null;
      }, maskDelay);
    } else if (currentLength <= prevLength || !isSecure || maskDelay <= 0) {
      clearTimer();
      setUnmaskedIndex(null);
    }

    prevValueRef.current = value;
  }, [clearTimer, isSecure, maskDelay, value]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const toggleSecure = useCallback(() => {
    setIsSecure((prev) => {
      const next = !prev;
      onToggleSecure?.(next);
      return next;
    });
  }, [onToggleSecure]);

  return {
    isSecure,
    unmaskedIndex,
    toggleSecure,
  };
}
