# react-native-otp-input-confirm

Headless-friendly OTP / PIN input for React Native, built with a clean architecture foundation.

## Features

- Controlled `PinInput` component with default OTP UI
- Digit-only input with paste support
- Focus management with tap-to-edit (truncates from tapped slot)
- `onComplete` callback when all digits are entered
- `secureTextEntry` for PIN mode
- Internal architecture ready for headless exports (`PinContainer`, `PinSlot`, `PinStick`) in future releases

## Installation

```sh
npm install react-native-otp-input-confirm
# or
yarn add react-native-otp-input-confirm
```

## Usage

```tsx
import { useState } from 'react';
import { PinInput } from 'react-native-otp-input-confirm';

export function OtpScreen() {
  const [value, setValue] = useState('');

  return (
    <PinInput
      value={value}
      onChange={setValue}
      length={6}
      autoFocus
      onComplete={(code) => console.log('OTP complete:', code)}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled OTP value (digits only) |
| `onChange` | `(value: string) => void` | — | Called when the value changes |
| `length` | `number` | `6` | Number of OTP digits |
| `autoFocus` | `boolean` | `false` | Focus the hidden input on mount |
| `disabled` | `boolean` | `false` | Disable input |
| `secureTextEntry` | `boolean` | `false` | Mask digits as bullets |
| `onComplete` | `(value: string) => void` | — | Called when all digits are filled |
| `testID` | `string` | — | Test identifier for the root element |

### Editing behavior

When the user taps a slot that already contains a digit, the value is truncated from that index so they can re-enter from that position. This matches common OTP input UX and keeps the focus indicator clean.

Example: `32332` → tap index `1` → value becomes `3`, focus moves to index `1`.

## Architecture

```
src/
├── domain/pin/              # Pure validation & focus logic
├── application/pin-input/   # Context, controller, actions
└── presentation/pin-input/  # React Native UI components
```

## Development

```sh
yarn install
yarn typecheck
yarn lint
yarn test
yarn example start
```

## Roadmap

- [ ] Export headless primitives: `PinContainer`, `PinSlot`, `PinStick`
- [ ] `PinInputPreset` styled variant
- [ ] Confirm flow (two inputs + match validation)
- [ ] Native SMS autofill

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
