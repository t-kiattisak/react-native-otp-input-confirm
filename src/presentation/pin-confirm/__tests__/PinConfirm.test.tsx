import { describe, expect, it, jest } from '@jest/globals';
import { createRef } from 'react';
import {
  PinInput,
  PinConfirm,
  PinMaskedText,
  type PinInputRef,
} from '../../../index';

describe('PinInput and PinConfirm Component & Masking Tests', () => {
  it('creates PinInput element with variants and masking options', () => {
    const onToggle = jest.fn();
    const element = (
      <PinInput
        value="123"
        onChange={() => {}}
        length={6}
        variant="underline"
        shakeOnError
        secureTextEntry
        maskChar="●"
        maskDelay={500}
        maskAnimation="pop"
        showVisibilityToggle
        onToggleSecure={onToggle}
      />
    );
    expect(element.props.variant).toBe('underline');
    expect(element.props.shakeOnError).toBe(true);
    expect(element.props.value).toBe('123');
    expect(element.props.secureTextEntry).toBe(true);
    expect(element.props.maskChar).toBe('●');
    expect(element.props.maskDelay).toBe(500);
    expect(element.props.maskAnimation).toBe('pop');
    expect(element.props.showVisibilityToggle).toBe(true);
  });

  it('creates PinConfirm element with label, masking, error, and styles', () => {
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
        secureTextEntry
        maskChar="✦"
        maskDelay={600}
        maskAnimation="fade"
        showVisibilityToggle
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
    expect(element.props.secureTextEntry).toBe(true);
    expect(element.props.maskChar).toBe('✦');
    expect(element.props.maskDelay).toBe(600);
    expect(element.props.maskAnimation).toBe('fade');
    expect(element.props.showVisibilityToggle).toBe(true);
    expect(element.props.blurOnComplete).toBe(true);
    expect(element.props.clearOnError).toBe(true);
  });

  it('creates PinMaskedText element with pop, fade, and custom chars', () => {
    const elementPop = (
      <PinMaskedText char="5" maskChar="•" isMasked={true} animation="pop" />
    );
    expect(elementPop.props.char).toBe('5');
    expect(elementPop.props.maskChar).toBe('•');
    expect(elementPop.props.isMasked).toBe(true);
    expect(elementPop.props.animation).toBe('pop');

    const elementFade = (
      <PinMaskedText char="9" maskChar="*" isMasked={false} animation="fade" />
    );
    expect(elementFade.props.char).toBe('9');
    expect(elementFade.props.maskChar).toBe('*');
    expect(elementFade.props.isMasked).toBe(false);
    expect(elementFade.props.animation).toBe('fade');
  });
});
