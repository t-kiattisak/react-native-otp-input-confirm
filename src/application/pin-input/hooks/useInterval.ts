import { useEffect, useRef } from 'react';

/**
 * Custom hook for declarative setInterval management.
 *
 * @param callback The function to execute on each interval tick.
 * @param delay Interval duration in milliseconds, or null/undefined to pause.
 */
export function useInterval(
  callback: () => void,
  delay: number | null | undefined
): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) {
      return;
    }

    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
}
