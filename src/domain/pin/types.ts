export type PinValue = string;

export type PinLength = number;

export type PinType = 'numeric' | 'alphanumeric' | 'alpha';

export type AutoCapitalizeType = 'none' | 'characters' | 'words' | 'sentences';

export type SlotState = {
  isFocused: boolean;
  isFilled: boolean;
  valueInside: string;
};
