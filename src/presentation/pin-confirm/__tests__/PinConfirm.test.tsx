import { describe, expect, it } from '@jest/globals';
import { createRef } from 'react';
import { PinInput, PinConfirm, type PinInputRef } from '../../../index';

describe('PinInput and PinConfirm Component & Ref Tests', () => {
  it('creates PinInput element with variants', () => {
    const element = (
      <PinInput
        value="123"
        onChange={() => {}}
        length={6}
        variant="underline"
        shakeOnError
      />
    );
    expect(element.props.variant).toBe('underline');
    expect(element.props.shakeOnError).toBe(true);
    expect(element.props.value).toBe('123');
  });

  it('creates PinConfirm element with label, error, and styles', () => {
    const ref = createRef<PinInputRef>();
    const element = (
      <PinConfirm
        ref={ref}
        value="12"
        onChange={() => {}}
        label="Security Code"
        error
        errorMessage="Invalid Code"
        variant="rounded"
        type="alphanumeric"
        autoCapitalize="characters"
        blurOnComplete
        clearOnError
      />
    );
    expect(element.props.label).toBe('Security Code');
    expect(element.props.error).toBe(true);
    expect(element.props.errorMessage).toBe('Invalid Code');
    expect(element.props.variant).toBe('rounded');
    expect(element.props.type).toBe('alphanumeric');
    expect(element.props.autoCapitalize).toBe('characters');
    expect(element.props.blurOnComplete).toBe(true);
    expect(element.props.clearOnError).toBe(true);
  });
});
