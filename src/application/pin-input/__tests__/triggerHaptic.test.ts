import { describe, expect, it, jest, beforeEach } from '@jest/globals';

const mockVibrate = jest.fn();

jest.mock('react-native', () => ({
  Platform: { OS: 'ios' },
  Vibration: {
    vibrate: mockVibrate,
  },
}));

describe('triggerHaptic', () => {
  beforeEach(() => {
    mockVibrate.mockClear();
  });

  it('vibrates on native platforms', async () => {
    const { triggerHaptic } = await import('../triggerHaptic');

    triggerHaptic();

    expect(mockVibrate).toHaveBeenCalledWith(10);
  });
});
