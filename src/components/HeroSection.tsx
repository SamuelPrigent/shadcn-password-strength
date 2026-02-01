"use client";

import React from "react";
import { CodeBlock } from "./CodeBlock";
import { PasswordStrength } from "@/lib";
import { PasswordInput } from "./PasswordInput";
import { Label } from "./ui/label";

interface HeroSectionProps {
  password: string;
  setPassword: (value: string) => void;
  onReset: () => void;
  codeExample: string;
}

const TITLE = "pass-strength-indicator";
const DESCRIPTION =
  "A customizable, accessible password strength indicator for React. Multi-language support, multiple display modes, and dark mode.";
const GITHUB_URL = "https://github.com/SamuelPrigent/pass-strength-indicator";

function BrandIcon() {
  return (
    <div className="w-14 h-14 bg-linear-to-br from-blue-600 to-sky-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    </div>
  );
}

function GradientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-linear-to-b from-blue-100/40 via-sky-50/20 to-transparent dark:from-blue-900/20 dark:via-sky-900/10 rounded-full blur-3xl"
    />
  );
}

export function HeroSection({
  password,
  setPassword,
  onReset,
  codeExample,
}: HeroSectionProps) {
  return (
    <section className="py-10 relative">
      <GradientGlow />
      <div className="text-center space-y-4 mb-8">
        <div className="flex justify-center">
          <BrandIcon />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {TITLE}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          {DESCRIPTION}
        </p>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 justify-center">
          <a
            href="#setup"
            className="px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
          >
            Get Started
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <CodeBlock
          code={codeExample}
          onReset={onReset}
          preview={
            <div className="space-y-2">
              <Label htmlFor="hero-demo">Password</Label>
              <PasswordInput
                id="hero-demo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordStrength value={password} />
            </div>
          }
        />
      </div>
    </section>
  );
}
