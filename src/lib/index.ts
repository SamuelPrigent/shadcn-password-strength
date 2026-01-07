// Main component
export { PasswordStrength, default } from "./PasswordStrength";

// Hook
export { usePasswordStrength, levelToActiveBars } from "./usePasswordStrength";

// Types
export type {
  PasswordStrengthProps,
  PasswordStrengthResult,
  PasswordRule,
  RuleOptions,
  Locale,
  StrengthLevel,
} from "./types";

// Utilities
export { getTranslation, translations } from "./translations";
export { defaultRules, optionalRules, evaluatePassword } from "./rules";
