export type Locale = "en" | "fr" | "es" | "de" | "pt" | "it" | "nl" | "pl" | "sv" | "uk" | "zh" | "ja" | "ko";

export type StrengthLevel = "veryWeak" | "weak" | "soso" | "good" | "strong";

export interface PasswordRule {
  id: string;
  test: (password: string, options?: RuleOptions) => boolean;
}

export interface RuleOptions {
  email?: string;
  forbiddenWords?: string[];
}

export interface PasswordStrengthResult {
  score: number; // 0-5
  level: StrengthLevel;
  passedRules: string[];
  failedRules: string[];
  percentage: number; // 0-100
}

export interface PasswordStrengthProps {
  /** Current password value */
  value: string;
  /** Language for labels and messages */
  locale?: Locale;
  /** Number of strength bars (3, 4, or 5) */
  barsNumber?: 3 | 4 | 5;
  /** Maximum number of rules to display (0 = no rules, just bar) */
  maxRules?: number;
  /** Email to check password doesn't contain it */
  email?: string;
  /** Additional words that should not be in the password */
  forbiddenWords?: string[];
  /** Additional class name for the container */
  className?: string;
  /** Additional class name for the strength bars */
  barClassName?: string;
  /** Visual bar mode: "default" (segmented bars) or "rounded" (continuous bar) */
  barMode?: "default" | "rounded";
  /** Background for the rules card. When set, wraps rules in a card.
   *  - string: Tailwind classes (e.g. "bg-zinc-100 dark:bg-zinc-900")
   *  - object: CSS colors for light/dark mode (e.g. { light: "#f5f5f5", dark: "#1c1c1c" }) */
  rulesBackground?: string | { light: string; dark: string };
}
