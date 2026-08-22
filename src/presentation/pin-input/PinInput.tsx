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
      type = 'numeric',
      autoCapitalize = 'none',
      autoFocus = false,
      disabled = false,
      secureTextEntry = false,
      maskChar = '•',
      onComplete,
      testID,
      error = false,
      errorMessage,
      styles: styleOverrides,
      variant = 'box',
      hapticFeedback = false,
      onHaptic,
      blurOnComplete = false,
      clearOnError = false,
      shakeOnError = false,
      slotTapBehavior = 'truncate',
      accessibilityLabel,
      children,
    },
    ref
  ) {
    const controller = usePinInputController({
      value,
      onChange,
      length,
      type,
      autoCapitalize,
      autoFocus,
      disabled,
      onComplete,
      hapticFeedback,
      onHaptic,
      blurOnComplete,
      clearOnError,
      error,
      slotTapBehavior,
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
              variant={variant}
              error={error}
              errorMessage={errorMessage}
              shakeOnError={shakeOnError}
              accessibilityLabel={accessibilityLabel}
            />
          )}
        </View>
      </PinInputContext.Provider>
    );
  }
);
