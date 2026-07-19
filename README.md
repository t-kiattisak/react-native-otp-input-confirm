# react-native-otp-input-confirm

Headless-friendly OTP / PIN input for React Native with theming, confirmation flow, and clean architecture.

## Features

- `PinInput` with default OTP UI or headless composition
- `createTheme()` + `PinThemeProvider` for app-wide styling
- `PinInputPreset` themed variant
- `PinConfirm` two-field match validation
- Tap-to-edit with truncate-from-index behavior
- `onComplete`, error state, haptic feedback, ref API, and accessibility support
- SMS OTP keyboard autofill (iOS Security Code AutoFill / Android `sms-otp`)

## Installation

```sh
npm install react-native-otp-input-confirm
# or
yarn add react-native-otp-input-confirm
```

## Theming

```tsx
import {
  createTheme,
  PinThemeProvider,
  PinInputPreset,
} from 'react-native-otp-input-confirm';

const theme = createTheme({
  slotFocused: { borderColor: '#2563EB', borderWidth: 2 },
  stick: { backgroundColor: '#2563EB' },
  errorText: { color: '#DC2626' },
});

<PinThemeProvider theme={theme}>
  <PinInputPreset value={value} onChange={setValue} length={6} />
</PinThemeProvider>;
```

Merge priority: `defaultPinTheme` → `createTheme()` → nested `PinThemeProvider` → component `styles` prop.

## Basic usage

```tsx
import { useRef, useState } from 'react';
import { PinInput, type PinInputRef } from 'react-native-otp-input-confirm';

export function OtpScreen() {
  const [value, setValue] = useState('');
  const ref = useRef<PinInputRef>(null);

  return (
    <PinInput
      ref={ref}
      value={value}
      onChange={setValue}
      length={6}
      autoFocus
      hapticFeedback
      onComplete={(code) => console.log(code)}
    />
  );
}
```

## Headless usage

```tsx
import { View, Text } from 'react-native';
import {
  PinInput,
  PinContainer,
  PinSlot,
  PinStick,
} from 'react-native-otp-input-confirm';

<PinInput value={value} onChange={setValue} length={6}>
  <PinContainer style={{ flexDirection: 'row', gap: 8 }}>
    {Array.from({ length: 6 }, (_, index) => (
      <PinSlot key={index} index={index}>
        {({ isFocused, isFilled, valueInside }) => (
          <View style={[styles.slot, isFocused && styles.focused]}>
            {valueInside ? <Text>{valueInside}</Text> : null}
            {isFocused && !valueInside ? <PinStick /> : null}
          </View>
        )}
      </PinSlot>
    ))}
  </PinContainer>
</PinInput>;
```

## PinConfirm

```tsx
import { PinConfirm } from 'react-native-otp-input-confirm';

<PinConfirm
  value={pin}
  confirmValue={confirmPin}
  onChange={setPin}
  onConfirmChange={setConfirmPin}
  length={6}
  labels={{ pin: 'Enter PIN', confirm: 'Confirm PIN' }}
  onMatch={(code) => console.log('matched', code)}
  errorMessage="PIN does not match"
/>;
```

## PinInput props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled OTP value |
| `onChange` | `(value: string) => void` | — | Value change handler |
| `length` | `number` | `6` | Number of digits |
| `autoFocus` | `boolean` | `false` | Focus hidden input on mount |
| `disabled` | `boolean` | `false` | Disable input |
| `secureTextEntry` | `boolean` | `false` | Mask digits |
| `onComplete` | `(value: string) => void` | — | Fired when all digits are entered |
| `error` | `boolean` | `false` | Error state |
| `errorMessage` | `string` | — | Error text below input |
| `styles` | `Partial<PinTheme>` | — | Local theme override |
| `hapticFeedback` | `boolean` | `false` | Vibrate on complete (Android requires `VIBRATE` permission; merged from this library) |
| `testID` | `string` | — | Root test id |

Ref API: `focus()`, `blur()`, `clear()`.

## SMS OTP keyboard autofill

When an OTP SMS arrives, iOS and Android can show the code **above the keyboard** so the user can fill it with one tap. This library uses a single hidden `TextInput` with the platform autofill hints already configured:

| Platform | Props |
| --- | --- |
| iOS | `textContentType="oneTimeCode"`, `autoComplete="one-time-code"` |
| Android | `autoComplete="sms-otp"`, `importantForAutofill="yes"` |

**Tips for reliable autofill**

- Keep the OTP field **focused** when the SMS arrives — use `autoFocus` on the OTP screen.
- Test on a **real device**; iOS Simulator usually does not show SMS suggestions.
- Do **not** use `secureTextEntry` on OTP screens; some devices hide autofill when masking is enabled.
- Ask your backend to send a recognizable OTP format, e.g. `Your code is 123456` or (iOS) `@yourapp.com #123456`.
- With `PinConfirm`, autofill goes to whichever field is focused — focus the Enter PIN field first.

Pasting or autofill fills all digits at once and triggers `onComplete` when the PIN is full.

## Focus behavior

Slot highlight and the caret stick follow the hidden input focus state. When the input blurs (switching fields, calling `ref.blur()`, or dismissing the keyboard), focused slot styling is cleared. `focusIndex` is kept so editing resumes at the correct slot when focused again.

## PinConfirm props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Primary PIN value |
| `confirmValue` | `string` | — | Confirmation PIN value |
| `onChange` | `(value: string) => void` | — | Primary PIN change handler |
| `onConfirmChange` | `(value: string) => void` | — | Confirm PIN change handler |
| `length` | `number` | `6` | Number of digits |
| `autoFocus` | `boolean` | `false` | Focus the primary PIN field on mount |
| `disabled` | `boolean` | `false` | Disable both fields |
| `secureTextEntry` | `boolean` | `false` | Mask digits |
| `onMatch` | `(value: string) => void` | — | Fired when both PINs match and are complete |
| `onMismatch` | `() => void` | — | Fired when confirm is complete but mismatched |
| `labels` | `{ pin?: string; confirm?: string }` | — | Optional field labels |
| `errorMessage` | `string` | `'PIN does not match'` | Error text on mismatch |
| `hapticFeedback` | `boolean` | `false` | Vibrate on match / mismatch |
| `styles` | `Partial<PinTheme>` | — | Local theme override |
| `testID` | `string` | `'pin-confirm'` | Root test id |

## Architecture

```
src/
├── domain/pin/              # validation, focus, match logic
├── application/pin-input/   # controller, actions, haptics
├── presentation/theme/      # createTheme, PinThemeProvider
├── presentation/pin-input/  # PinInput, headless primitives
└── presentation/pin-confirm/# PinConfirm
```

## Development

```sh
yarn install
yarn typecheck
yarn lint
yarn test
yarn example start
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
