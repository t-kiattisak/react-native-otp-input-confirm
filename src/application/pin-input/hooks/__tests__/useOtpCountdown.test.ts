import { describe, expect, it } from '@jest/globals';
import { formatSecondsToTime } from '../../utility/formatTime';
import { useOtpCountdown } from '../useOtpCountdown';

describe('useOtpCountdown & formatSecondsToTime Tests', () => {
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
});
