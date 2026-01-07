import { useMemo } from 'react';
import type { PasswordStrengthResult, StrengthLevel, RuleOptions } from './types';
import { evaluatePassword } from './rules';

/**
 * Maps a score (0-5) to a strength level
 */
function scoreToLevel(score: number, levels: 3 | 4 | 5): StrengthLevel {
  if (levels === 5) {
    if (score === 0) return 'veryWeak';
    if (score === 1) return 'veryWeak';
    if (score === 2) return 'weak';
    if (score === 3) return 'soso';
    if (score === 4) return 'good';
    return 'strong';
  }

  if (levels === 4) {
    if (score <= 1) return 'weak';
    if (score === 2) return 'soso';
    if (score === 3 || score === 4) return 'good';
    return 'strong';
  }

  // 3 levels
  if (score <= 2) return 'weak';
  if (score <= 4) return 'soso';
  return 'strong';
}

/**
 * Maps a strength level to the number of active bars
 */
export function levelToActiveBars(level: StrengthLevel, totalBars: 3 | 4 | 5): number {
  const mapping: Record<StrengthLevel, Record<3 | 4 | 5, number>> = {
    veryWeak: { 3: 0, 4: 0, 5: 1 },
    weak: { 3: 1, 4: 1, 5: 2 },
    soso: { 3: 2, 4: 2, 5: 3 },
    good: { 3: 2, 4: 3, 5: 4 },
    strong: { 3: 3, 4: 4, 5: 5 },
  };
  return mapping[level][totalBars];
}

export interface UsePasswordStrengthOptions {
  barsNumber?: 3 | 4 | 5;
  email?: string;
  forbiddenWords?: string[];
}

export function usePasswordStrength(
  password: string,
  options: UsePasswordStrengthOptions = {}
): PasswordStrengthResult {
  const { barsNumber = 5, email, forbiddenWords } = options;

  return useMemo(() => {
    if (!password) {
      return {
        score: 0,
        level: 'veryWeak' as StrengthLevel,
        passedRules: [],
        failedRules: ['minLength', 'uppercase', 'lowercase', 'number', 'special'],
        percentage: 0,
      };
    }

    const ruleOptions: RuleOptions = { email, forbiddenWords };
    const { passedRules, failedRules, score } = evaluatePassword(password, ruleOptions);
    const level = scoreToLevel(score, barsNumber);
    const percentage = Math.round((score / 5) * 100);

    return {
      score,
      level,
      passedRules,
      failedRules,
      percentage,
    };
  }, [password, barsNumber, email, forbiddenWords]);
}
