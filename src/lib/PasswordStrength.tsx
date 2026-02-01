"use client";

import React, { useState, useEffect, useMemo } from "react";
import { clsx } from "clsx";
import type { PasswordStrengthProps, StrengthLevel } from "./types";
import { usePasswordStrength, levelToActiveBars } from "./usePasswordStrength";
import {
  loadTranslation,
  getTranslationSync,
  type Translation,
} from "./translations/index";
import { CheckIcon, XIcon } from "./icons";

// Strength level colors
const levelColors: Record<StrengthLevel, { bar: string; text: string }> = {
  veryWeak: {
    bar: "bg-gray-300 dark:bg-gray-600",
    text: "text-gray-500 dark:text-gray-400",
  },
  weak: {
    bar: "bg-red-500",
    text: "text-red-500",
  },
  soso: {
    bar: "bg-orange-400",
    text: "text-orange-400",
  },
  good: {
    bar: "bg-lime-500",
    text: "text-lime-500",
  },
  strong: {
    bar: "bg-green-500",
    text: "text-green-500",
  },
};

export function PasswordStrength({
  value,
  locale = "en",
  barsNumber = 5,
  maxRules = 2,
  email,
  forbiddenWords,
  className,
  barClassName,
  barMode = "default",
  rulesBackground,
}: PasswordStrengthProps) {
  const [translation, setTranslation] = useState<Translation>(() =>
    getTranslationSync(locale),
  );

  useEffect(() => {
    loadTranslation(locale).then(setTranslation);
  }, [locale]);

  const { level, passedRules, failedRules, percentage } = usePasswordStrength(
    value,
    { barsNumber, email, forbiddenWords },
  );

  const colors = levelColors[level];
  const activeBars = levelToActiveBars(level, barsNumber);
  const isRounded = barMode === "rounded";

  const displayRules = useMemo(
    () =>
      [
        ...failedRules.slice(0, maxRules),
        ...passedRules.slice(0, Math.max(0, maxRules - failedRules.length)),
      ].slice(0, maxRules),
    [failedRules, passedRules, maxRules],
  );

  const hasValue = value && value.length > 0;
  const hasRules = maxRules > 0 && displayRules.length > 0;

  // Resolve rulesBackground
  let cardBgClass: string | undefined;
  let cardBgStyle: React.CSSProperties | undefined;

  if (rulesBackground) {
    if (typeof rulesBackground === "object") {
      cardBgStyle = {
        "--rcbg-l": rulesBackground.light,
        "--rcbg-d": rulesBackground.dark,
      } as React.CSSProperties;
      cardBgClass = "bg-[var(--rcbg-l)] dark:bg-[var(--rcbg-d)]";
    } else {
      cardBgClass = rulesBackground;
    }
  }

  const showCard = hasRules && !!rulesBackground;

  return (
    <div className={clsx("w-full", className)}>
      {hasValue && (
        <>
          {/* ── Card layout (rules + bar inside card) ── */}
          {showCard && (
            <div
              className={clsx(
                "p-3 rounded-lg space-y-2 mt-[17px]",
                cardBgClass,
              )}
              style={cardBgStyle}
            >
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {translation.passwordMustInclude}
              </p>
              <ul className="space-y-1">
                {displayRules.map((ruleId) => {
                  const isPassed = passedRules.includes(ruleId);
                  const ruleLabel =
                    translation.rules[ruleId as keyof typeof translation.rules];
                  return (
                    <li
                      key={ruleId}
                      className={clsx(
                        "flex items-center gap-[10px] text-sm transition-colors",
                        isPassed
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400",
                      )}
                    >
                      {isPassed ? (
                        <CheckIcon className="text-blue-500 shrink-0" />
                      ) : (
                        <XIcon className="text-gray-400 shrink-0" />
                      )}
                      <span className="text-black dark:text-white">
                        {ruleLabel}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div
                className={clsx("space-y-1.5", !isRounded && "pt-[6px] pb-2")}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {translation.passwordStrength}
                  </span>
                  <span className={clsx("font-medium", colors.text)}>
                    {translation.levels[level]}
                  </span>
                </div>
                {isRounded ? (
                  <div
                    className={clsx(
                      "h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700",
                      barClassName,
                    )}
                  >
                    <div
                      className={clsx(
                        "h-1 rounded-full transition-all duration-300",
                        colors.bar,
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                ) : (
                  <div className={clsx("flex gap-1", barClassName)}>
                    {Array.from({ length: barsNumber }).map((_, index) => (
                      <div
                        key={index}
                        className={clsx(
                          "h-[3.5px] mt-[6px] flex-1 rounded-full transition-all duration-300",
                          index < activeBars
                            ? colors.bar
                            : "bg-gray-200 dark:bg-gray-700",
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Clean layout (rules without card) ── */}
          {hasRules && !showCard && (
            <div className="space-y-3 mt-4">
              <div className="space-y-1.5">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {translation.passwordMustInclude}
                </p>
                <ul className="space-y-1">
                  {displayRules.map((ruleId) => {
                    const isPassed = passedRules.includes(ruleId);
                    const ruleLabel =
                      translation.rules[
                        ruleId as keyof typeof translation.rules
                      ];
                    return (
                      <li
                        key={ruleId}
                        className={clsx(
                          "flex items-center gap-[10px] text-sm transition-colors",
                          isPassed
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-600 dark:text-gray-400",
                        )}
                      >
                        {isPassed ? (
                          <CheckIcon className="text-blue-500 shrink-0" />
                        ) : (
                          <XIcon className="text-gray-400 shrink-0" />
                        )}
                        <span className="text-black dark:text-white">
                          {ruleLabel}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="space-y-1.5 mt-3.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {translation.passwordStrength}
                  </span>
                  <span className={clsx("font-medium", colors.text)}>
                    {translation.levels[level]}
                  </span>
                </div>
                {isRounded ? (
                  <div
                    className={clsx(
                      "h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700",
                      barClassName,
                    )}
                  >
                    <div
                      className={clsx(
                        "h-1 rounded-full transition-all duration-300",
                        colors.bar,
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                ) : (
                  <div className={clsx("flex gap-1", barClassName)}>
                    {Array.from({ length: barsNumber }).map((_, index) => (
                      <div
                        key={index}
                        className={clsx(
                          "h-[3.5px] mt-[6px] flex-1 rounded-full transition-all duration-300",
                          index < activeBars
                            ? colors.bar
                            : "bg-gray-200 dark:bg-gray-700",
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── No rules — bar only ── */}
          {!hasRules && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {translation.passwordStrength}
                </span>
                <span className={clsx("font-medium", colors.text)}>
                  {translation.levels[level]}
                </span>
              </div>
              {isRounded ? (
                <div
                  className={clsx(
                    "h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700",
                    barClassName,
                  )}
                >
                  <div
                    className={clsx(
                      "h-1 rounded-full transition-all duration-300",
                      colors.bar,
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              ) : (
                <div className={clsx("flex gap-1", barClassName)}>
                  {Array.from({ length: barsNumber }).map((_, index) => (
                    <div
                      key={index}
                      className={clsx(
                        "h-[3.5px] flex-1 mt-0.5 rounded-full transition-all duration-300",
                        index < activeBars
                          ? colors.bar
                          : "bg-gray-200 dark:bg-gray-700",
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PasswordStrength;
