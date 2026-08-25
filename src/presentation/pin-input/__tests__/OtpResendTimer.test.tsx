import { describe, expect, it, jest } from '@jest/globals';
import { OtpResendTimer } from '../OtpResendTimer';

describe('OtpResendTimer Component Tests', () => {
  it('creates OtpResendTimer element with props', () => {
    const onResend = jest.fn<() => void>();
    const element = (
      <OtpResendTimer
        duration={60}
        autoStart
        onResend={onResend}
        label="Resend OTP in"
        resendText="Send Again"
      />
    );
    expect(element.props.duration).toBe(60);
    expect(element.props.autoStart).toBe(true);
    expect(element.props.label).toBe('Resend OTP in');
    expect(element.props.resendText).toBe('Send Again');
  });
});
