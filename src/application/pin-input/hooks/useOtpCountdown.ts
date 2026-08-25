import { useCallback, useEffect, useRef, useState } from 'react';
import { formatSecondsToTime } from '../utility/formatTime';

export type UseOtpCountdownParams = {
  duration?: number;
  autoStart?: boolean;
  onExpire?: () => void;
  onTick?: (remainingSeconds: number) => void;
};

export type UseOtpCountdownReturn = {
  seconds: number;
  formattedTime: string;
  isRunning: boolean;
  isExpired: boolean;
  start: () => void;
  stop: () => void;
  restart: (newDuration?: number) => void;
  reset: () => void;
};

export function useOtpCountdown({
  duration = 60,
  autoStart = true,
  onExpire,
  onTick,
}: UseOtpCountdownParams = {}): UseOtpCountdownReturn {
  const initialDuration = Math.max(0, duration);
  const [seconds, setSeconds] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(autoStart && initialDuration > 0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onExpireRef = useRef(onExpire);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const start = useCallback(() => {
    setSeconds((prev) => {
      if (prev > 0) {
        setIsRunning(true);
      }
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setSeconds(initialDuration);
  }, [clearTimer, initialDuration]);

  const restart = useCallback(
    (newDuration?: number) => {
      clearTimer();
      const nextDuration =
        newDuration !== undefined ? Math.max(0, newDuration) : initialDuration;
      setSeconds(nextDuration);
      if (nextDuration > 0) {
        setIsRunning(true);
      } else {
        setIsRunning(false);
        onExpireRef.current?.();
      }
    },
    [clearTimer, initialDuration]
  );

  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearTimer();
          setIsRunning(false);
          onExpireRef.current?.();
          return 0;
        }
        onTickRef.current?.(next);
        return next;
      });
    }, 1000);

    return () => {
      clearTimer();
    };
  }, [clearTimer, isRunning]);

  return {
    seconds,
    formattedTime: formatSecondsToTime(seconds),
    isRunning,
    isExpired: seconds === 0,
    start,
    stop,
    restart,
    reset,
  };
}
