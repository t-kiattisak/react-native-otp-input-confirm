/* eslint-disable @react-native/no-deep-imports */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { act, useState } from 'react';
// @ts-expect-error Internal React Native test renderer implementation
import { renderElement } from 'react-native/Libraries/ReactNative/RendererImplementation';
import { useInterval } from '../useInterval';

describe('useInterval Hook Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('exports useInterval function', () => {
    expect(typeof useInterval).toBe('function');
  });

  it('invokes callback repeatedly with specified delay', () => {
    const callback = jest.fn();

    function TestComponent() {
      useInterval(callback, 1000);
      return null;
    }

    act(() => {
      renderElement({
        element: <TestComponent />,
        rootTag: 1,
        useFabric: false,
        useConcurrentRoot: false,
      });
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('does not invoke callback when delay is null or undefined', () => {
    const callbackNull = jest.fn();
    const callbackUndefined = jest.fn();

    function TestComponent() {
      useInterval(callbackNull, null);
      useInterval(callbackUndefined, undefined);
      return null;
    }

    act(() => {
      renderElement({
        element: <TestComponent />,
        rootTag: 2,
        useFabric: false,
        useConcurrentRoot: false,
      });
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(callbackNull).not.toHaveBeenCalled();
    expect(callbackUndefined).not.toHaveBeenCalled();
  });

  it('handles dynamic delay updates including pausing with null', () => {
    const callback = jest.fn();
    let setDelayFn: (delay: number | null) => void = () => {};

    function TestComponent() {
      const [delay, setDelay] = useState<number | null>(1000);
      setDelayFn = setDelay;
      useInterval(callback, delay);
      return null;
    }

    act(() => {
      renderElement({
        element: <TestComponent />,
        rootTag: 3,
        useFabric: false,
        useConcurrentRoot: false,
      });
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    // Switch to faster delay (500ms)
    act(() => {
      setDelayFn(500);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(3);

    // Pause timer
    act(() => {
      setDelayFn(null);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('maintains latest callback reference without resetting interval schedule', () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    let setCallbackFn: (fn: () => void) => void = () => {};

    function TestComponent() {
      const [cb, setCb] = useState<() => void>(() => firstCallback);
      setCallbackFn = (next) => setCb(() => next);
      useInterval(cb, 1000);
      return null;
    }

    act(() => {
      renderElement({
        element: <TestComponent />,
        rootTag: 4,
        useFabric: false,
        useConcurrentRoot: false,
      });
    });

    // Advance halfway through interval
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Update callback reference mid-interval
    act(() => {
      setCallbackFn(secondCallback);
    });

    // Advance the remaining 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });
});
