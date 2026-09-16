/* eslint-disable @react-native/no-deep-imports */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { act } from 'react';
// @ts-expect-error Internal React Native test renderer implementation
import { renderElement } from 'react-native/Libraries/ReactNative/RendererImplementation';
import { formatSecondsToTime } from '../../utility/formatTime';
import {
  useOtpCountdown,
  type UseOtpCountdownParams,
  type UseOtpCountdownReturn,
} from '../useOtpCountdown';

describe('useOtpCountdown & formatSecondsToTime Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('formats seconds correctly into mm:ss', () => {
    expect(formatSecondsToTime(0)).toBe('00:00');
    expect(formatSecondsToTime(9)).toBe('00:09');
    expect(formatSecondsToTime(59)).toBe('00:59');
    expect(formatSecondsToTime(60)).toBe('01:00');
    expect(formatSecondsToTime(125)).toBe('02:05');
    expect(formatSecondsToTime(-5)).toBe('00:00');
  });

  it('exports useOtpCountdown hook correctly', () => {
    expect(typeof useOtpCountdown).toBe('function');
  });

  it('counts down and triggers onTick and onExpire correctly', () => {
    const onTick = jest.fn();
    const onExpire = jest.fn();
    let currentHook!: UseOtpCountdownReturn;

    function TestComponent() {
      currentHook = useOtpCountdown({
        duration: 3,
        autoStart: true,
        onTick,
        onExpire,
      });
      return null;
    }

    act(() => {
      renderElement({
        element: <TestComponent />,
        rootTag: 10,
        useFabric: false,
        useConcurrentRoot: false,
      });
    });

    expect(currentHook.seconds).toBe(3);
    expect(currentHook.formattedTime).toBe('00:03');
    expect(currentHook.isRunning).toBe(true);
    expect(currentHook.isExpired).toBe(false);

    // 1 second elapsed
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(currentHook.seconds).toBe(2);
    expect(currentHook.formattedTime).toBe('00:02');
    expect(onTick).toHaveBeenCalledWith(2);

    // 2 seconds elapsed
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(currentHook.seconds).toBe(1);
    expect(onTick).toHaveBeenCalledWith(1);

    // 3 seconds elapsed (expires)
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(currentHook.seconds).toBe(0);
    expect(currentHook.formattedTime).toBe('00:00');
    expect(currentHook.isRunning).toBe(false);
    expect(currentHook.isExpired).toBe(true);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it('supports manual controls: stop, start, reset, and restart', () => {
    let currentHook!: UseOtpCountdownReturn;

    function TestComponent({
      options,
    }: {
      options?: Partial<UseOtpCountdownParams>;
    }) {
      currentHook = useOtpCountdown({
        duration: 10,
        autoStart: false,
        ...options,
      });
      return null;
    }

    act(() => {
      renderElement({
        element: <TestComponent />,
        rootTag: 11,
        useFabric: false,
        useConcurrentRoot: false,
      });
    });

    expect(currentHook.seconds).toBe(10);
    expect(currentHook.isRunning).toBe(false);

    // Advance timer while paused
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(currentHook.seconds).toBe(10);

    // Start manually
    act(() => {
      currentHook.start();
    });
    expect(currentHook.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(currentHook.seconds).toBe(8);

    // Stop manually
    act(() => {
      currentHook.stop();
    });
    expect(currentHook.isRunning).toBe(false);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(currentHook.seconds).toBe(8);

    // Reset back to initial duration
    act(() => {
      currentHook.reset();
    });
    expect(currentHook.seconds).toBe(10);
    expect(currentHook.isRunning).toBe(false);

    // Restart with a new custom duration
    act(() => {
      currentHook.restart(5);
    });
    expect(currentHook.seconds).toBe(5);
    expect(currentHook.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(currentHook.seconds).toBe(0);
    expect(currentHook.isRunning).toBe(false);
    expect(currentHook.isExpired).toBe(true);
  });
});
