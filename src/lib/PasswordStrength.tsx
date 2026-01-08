"use client";

import React, { useState, useId } from "react";
import { clsx } from "clsx";
import type { PasswordStrengthProps, StrengthLevel } from "./types";
import { usePasswordStrength, levelToActiveBars } from "./usePasswordStrength";
import { getTranslation } from "./translations";

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

// Icons
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={clsx("w-4 h-4", className)}
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={clsx("w-4 h-4", className)}
    >
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={clsx("w-4 h-4", className)}
    >
      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      <path
        fillRule="evenodd"
        d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EyeSlashIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={clsx("w-4 h-4", className)}
    >
      <path
        fillRule="evenodd"
        d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
        clipRule="evenodd"
      />
      <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
    </svg>
  );
}

export function PasswordStrength({
  value,
  onChange,
  locale = "en",
  barsNumber = 5,
  maxRules = 2,
  email,
  forbiddenWords,
  className,
  barClassName,
  inputClassName,
  placeholder,
  label,
  showToggleVisibility = true,
  InputComponent,
  LabelComponent,
}: PasswordStrengthProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();

  const translation = getTranslation(locale);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { level, passedRules, failedRules, score } = usePasswordStrength(
    value,
    {
      barsNumber,
      email,
      forbiddenWords,
    }
  );

  const colors = levelColors[level];
  const activeBars = levelToActiveBars(level, barsNumber);

  // Get display rules (failed first, then passed)
  const displayRules = [
    ...failedRules.slice(0, maxRules),
    ...passedRules.slice(0, Math.max(0, maxRules - failedRules.length)),
  ].slice(0, maxRules);

  const hasValue = value && value.length > 0;

  return (
    <div className={clsx("w-full space-y-2", className)}>
      {/* Input field */}
      <div className="space-y-1.5">
        {label !== undefined ? (
          label &&
          (LabelComponent ? (
            <LabelComponent htmlFor={inputId}>{label}</LabelComponent>
          ) : (
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              {label}
            </label>
          ))
        ) : LabelComponent ? (
          <LabelComponent htmlFor={inputId}>{translation.label}</LabelComponent>
        ) : (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {translation.label}
          </label>
        )}
        <div className="relative">
          {InputComponent ? (
            <InputComponent
              id={inputId}
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder={placeholder || translation.placeholder}
              className={clsx("pr-10", hasValue, inputClassName)}
            />
          ) : (
            <input
              id={inputId}
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder={placeholder || translation.placeholder}
              className={clsx(
                "w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-offset-0",
                hasValue &&
                  `focus:ring-${
                    level === "strong"
                      ? "green"
                      : level === "good"
                      ? "lime"
                      : level === "soso"
                      ? "orange"
                      : level === "weak"
                      ? "red"
                      : "gray"
                  }-500/30`,
                inputClassName
              )}
            />
          )}
          {showToggleVisibility && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          )}
        </div>
      </div>

      {/* Strength indicator */}
      {hasValue && (
        <div className="space-y-2">
          {/* Rules section with strength bar inside (when maxRules > 0) */}
          {maxRules > 0 && displayRules.length > 0 && (
            <div className="p-3 rounded-lg bg-[#f9f9f9] dark:bg-[#eeeeee08] space-y-2 mt-[17px]">
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
                          : "text-gray-600 dark:text-gray-400"
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

              {/* Strength bars and label inside card */}
              <div className="space-y-1.5 pt-[6px] pb-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {translation.passwordStrength}
                  </span>
                  <span className={clsx("font-medium", colors.text)}>
                    {translation.levels[level]}
                  </span>
                </div>
                <div className={clsx("flex gap-1", barClassName)}>
                  {Array.from({ length: barsNumber }).map((_, index) => (
                    <div
                      key={index}
                      className={clsx(
                        "h-[3.2px] mt-[6px] flex-1 rounded-full transition-all duration-300",
                        index < activeBars
                          ? colors.bar
                          : "bg-gray-200 dark:bg-gray-700"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Strength bars only (when maxRules === 0) */}
          {maxRules === 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {translation.passwordStrength}
                </span>
                <span className={clsx("font-medium", colors.text)}>
                  {translation.levels[level]}
                </span>
              </div>
              <div className={clsx("flex gap-1", barClassName)}>
                {Array.from({ length: barsNumber }).map((_, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "h-[3px] flex-1 mt-0.5 rounded-full transition-all duration-300",
                      index < activeBars
                        ? colors.bar
                        : "bg-gray-200 dark:bg-gray-700"
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PasswordStrength;
