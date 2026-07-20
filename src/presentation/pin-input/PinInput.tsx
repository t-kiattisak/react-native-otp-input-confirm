import { forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import { PinInputContext } from '../../application/pin-input/context/PinInputContext';
import { usePinInputController } from '../../application/pin-input/hooks/usePinInputController';
import { PinHiddenInput } from './PinHiddenInput';
import { PinInputDefaultView } from './PinInputDefaultView';
import type { PinInputProps, PinInputRef } from './types';

export const PinInput = forwardRef<PinInputRef, PinInputProps>(
  function PinInputComponent(
    {
      value,
      onChange,
      length = 6,
      autoFocus = false,
      disabled = false,
      secureTextEntry = false,
      maskChar = '•',
      onComplete,
      testID,
      error = false,
      errorMessage,
      styles: styleOverrides,
      hapticFeedback = false,
      accessibilityLabel,
      children,
    },
    ref
  ) {
    const controller = usePinInputController({
      value,
      onChange,
      length,
      autoFocus,
      disabled,
      onComplete,
      hapticFeedback,
    });

    useImperativeHandle(
      ref,
      () => ({
        focus: controller.focusInput,
        blur: controller.blurInput,
        clear: controller.clearInput,
      }),
      [controller.blurInput, controller.clearInput, controller.focusInput]
    );

    const contextValue = {
      ...controller,
      secureTextEntry,
      maskChar,
    };

    return (
      <PinInputContext.Provider value={contextValue}>
        <View testID={testID}>
          <PinHiddenInput testID={testID ? `${testID}-input` : undefined} />
          {children ?? (
            <PinInputDefaultView
              styles={styleOverrides}
              error={error}
              errorMessage={errorMessage}
              accessibilityLabel={accessibilityLabel}
            />
          )}
        </View>
      </PinInputContext.Provider>
    );
  }
);
