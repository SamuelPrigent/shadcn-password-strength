"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyButton } from "@/components/CopyButton";
import { HeroSection } from "@/components/HeroSection";
import { PasswordStrength } from "@/lib";
import type { Locale } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/PasswordInput";
//
// Code examples
const basicExample = `import { useState } from "react";
import { PasswordStrength } from "pass-strength-indicator";

export function BasicExample() {
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-2">
      <label htmlFor="password" className="text-sm font-medium">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
      />
      <PasswordStrength value={password} />
    </div>
  );
}`;

const maxRulesExample = `import { useState } from "react";
import { PasswordStrength } from "pass-strength-indicator";

export function MaxRulesExample() {
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-6">
      {/* No rules (bar only) */}
      <div className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <PasswordStrength value={password} maxRules={0} />
      </div>

      {/* 2 rules */}
      <div className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <PasswordStrength value={password} maxRules={2} />
      </div>

      {/* 3 rules */}
      <div className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <PasswordStrength value={password} maxRules={3} />
      </div>
    </div>
  );
}`;

const barModeExample = `import { useState } from "react";
import { PasswordStrength } from "pass-strength-indicator";

export function BarModeExample() {
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-6">
      {/* Default - segmented bars */}
      <div className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <PasswordStrength value={password} barMode="default" />
      </div>

      {/* Rounded - continuous bar */}
      <div className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <PasswordStrength value={password} barMode="rounded" />
      </div>
    </div>
  );
}`;

const rulesBgExample = `import { useState } from "react";
import { PasswordStrength } from "pass-strength-indicator";

export function RulesBackgroundExample() {
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-2">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
      />
      {/* With Tailwind classes */}
      <PasswordStrength
        value={password}
        rulesBackground="bg-[#f9f9f9] dark:bg-[#eeeeee0f]"
      />
      {/* Via CSS */}
      {/*
      <PasswordStrength
        value={password}
        rulesBackground={{ light: "#f9f9f9", dark: "#eeeeee0f" }}
      />
      */}
    </div>
  );
}`;

const barsNumberExample = `import { useState } from "react";
import { PasswordStrength } from "pass-strength-indicator";

export function BarsNumberExample() {
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-6">
      {/* 3 bars */}
      <div className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <PasswordStrength value={password} barsNumber={3} maxRules={0} />
      </div>

      {/* 4 bars */}
      <div className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <PasswordStrength value={password} barsNumber={4} maxRules={0} />
      </div>

      {/* 5 bars (default) */}
      <div className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <PasswordStrength value={password} barsNumber={5} maxRules={0} />
      </div>
    </div>
  );
}`;

const emailExample = `import { useState } from "react";
import { PasswordStrength } from "pass-strength-indicator";

export function EmailCheckExample() {
  const [email, setEmail] = useState("johndoe@mail.com");
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <PasswordStrength
          value={password}
          email={email}
          maxRules={3}
        />
      </div>
    </div>
  );
}`;

// Locale configuration with inline SVG flags
const flags: Record<Locale, React.ReactNode> = {
  en: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 60 30">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#t)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  ),
  fr: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#ED2939" />
      <rect width="2" height="2" fill="#fff" />
      <rect width="1" height="2" fill="#002395" />
    </svg>
  ),
  es: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#c60b1e" />
      <rect width="3" height="1" y="0.5" fill="#ffc400" />
    </svg>
  ),
  de: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 5 3">
      <rect width="5" height="3" fill="#FFCE00" />
      <rect width="5" height="2" fill="#DD0000" />
      <rect width="5" height="1" fill="#000" />
    </svg>
  ),
  pt: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#FF0000" />
      <rect width="1.2" height="2" fill="#006600" />
    </svg>
  ),
  it: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#CE2B37" />
      <rect width="2" height="2" fill="#fff" />
      <rect width="1" height="2" fill="#009246" />
    </svg>
  ),
  nl: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 9 6">
      <rect width="9" height="6" fill="#21468B" />
      <rect width="9" height="4" fill="#fff" />
      <rect width="9" height="2" fill="#AE1C28" />
    </svg>
  ),
  pl: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 8 5">
      <rect width="8" height="5" fill="#DC143C" />
      <rect width="8" height="2.5" fill="#fff" />
    </svg>
  ),
  sv: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 16 10">
      <rect width="16" height="10" fill="#006AA7" />
      <rect x="5" width="2" height="10" fill="#FECC00" />
      <rect y="4" width="16" height="2" fill="#FECC00" />
    </svg>
  ),
  uk: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 3 2">
      <rect width="3" height="1" fill="#005BBB" />
      <rect y="1" width="3" height="1" fill="#FFD500" />
    </svg>
  ),
  zh: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#DE2910" />
      <polygon
        fill="#FFDE00"
        points="5,4 6,7 9,7 6.5,9 7.5,12 5,10 2.5,12 3.5,9 1,7 4,7"
      />
    </svg>
  ),
  ja: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#fff" />
      <circle cx="1.5" cy="1" r="0.6" fill="#BC002D" />
    </svg>
  ),
  ko: (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#fff" />
      <circle cx="1.5" cy="1" r="0.5" fill="#C60C30" />
      <path d="M1.5,0.5 A0.5,0.5 0 0,1 1.5,1.5" fill="#003478" />
    </svg>
  ),
};

const localeLabels: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  es: "es",
  de: "de",
  pt: "pt",
  it: "it",
  nl: "nl",
  pl: "pl",
  sv: "sv",
  uk: "uk",
  zh: "zh",
  ja: "ja",
  ko: "ko",
};

// Generate locale example code
const generateLocaleExample = (
  locale: Locale,
) => `import { useState } from "react";
import { PasswordStrength } from "pass-strength-indicator";

export function Example() {
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-2">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
      />
      <PasswordStrength
        value={password}
        locale="${locale}"
      />
    </div>
  );
}`;

// Default values for examples
const DEFAULT_BASIC = "MyP@ssw0rd123";
const DEFAULT_MAX_RULES = "Str0ng!Pass";
const DEFAULT_BARMODE = "Str0ng!Pass";
const DEFAULT_RULESBG = "Str0ng!Pass";
const DEFAULT_BARS = "Test@123";
const DEFAULT_EMAIL = "johndoe@mail.com";
const DEFAULT_EMAIL_PWD = "ndoe9120*JOk";
const DEFAULT_LOCALE_PWD = "MonMotDePasse";

export default function Home() {
  const [basicPassword, setBasicPassword] = useState(DEFAULT_BASIC);
  const [maxRulesPassword, setMaxRulesPassword] = useState(DEFAULT_MAX_RULES);
  const [barModePassword, setBarModePassword] = useState(DEFAULT_BARMODE);
  const [rulesBgPassword, setRulesBgPassword] = useState(DEFAULT_RULESBG);
  const [barsPassword, setBarsPassword] = useState(DEFAULT_BARS);
  const [emailValue, setEmailValue] = useState(DEFAULT_EMAIL);
  const [emailPassword, setEmailPassword] = useState(DEFAULT_EMAIL_PWD);
  const [selectedLocale, setSelectedLocale] = useState<Locale>("en");
  const [localePassword, setLocalePassword] = useState(DEFAULT_LOCALE_PWD);
  // Shared password visibility per example block
  const [maxRulesVisible, setMaxRulesVisible] = useState(false);
  const [barModeVisible, setBarModeVisible] = useState(false);
  const [barsVisible, setBarsVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Theme Toggle - Sticky top right */}
      <ThemeToggle />

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <HeroSection
          password={basicPassword}
          setPassword={setBasicPassword}
          onReset={() => setBasicPassword(DEFAULT_BASIC)}
          codeExample={basicExample}
        />
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Setup */}
        <section id="setup" className="py-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Setup
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="pb-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                1. Install Tailwind CSS
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Follow the{" "}
                <a
                  href="https://tailwindcss.com/docs/installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  installation guide
                </a>{" "}
                if not already set up.
              </p>
            </div>

            {/* Step 2 */}
            <div className="pb-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                2. Install the package
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Add pass-strength-indicator to your project.
              </p>
              <div className="relative">
                <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 pr-12 font-mono text-sm text-gray-900 dark:text-gray-100 overflow-x-auto">
                  npm install pass-strength-indicator
                </pre>
                <CopyButton
                  text="npm install pass-strength-indicator"
                  className="absolute top-2.5 right-2"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                3. Import and use
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Import the component and pass your password value.
              </p>
              <div className="relative">
                <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 pr-12 font-mono text-sm text-gray-900 dark:text-gray-100 overflow-x-auto">
                  {`import { PasswordStrength } from "pass-strength-indicator";`}
                </pre>
                <CopyButton
                  text={`import { PasswordStrength } from "pass-strength-indicator";`}
                  className="absolute top-2.5 right-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* More Examples */}
        <section
          id="examples"
          className="py-12 border-t border-gray-200 dark:border-gray-800 space-y-10"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Custom props
          </h2>

          {/* Max rules */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              maxRules
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Control how many password rules are displayed. Set to 0 for
              bar-only mode.
            </p>
            <CodeBlock
              code={maxRulesExample}
              onReset={() => setMaxRulesPassword(DEFAULT_MAX_RULES)}
              preview={
                <div className="space-y-12">
                  <div className="space-y-2">
                    <Label htmlFor="demo-maxrules-0">Password</Label>
                    <PasswordInput
                      id="demo-maxrules-0"
                      value={maxRulesPassword}
                      onChange={(e) => setMaxRulesPassword(e.target.value)}
                      visible={maxRulesVisible}
                      onToggleVisible={() => setMaxRulesVisible((v) => !v)}
                    />
                    <PasswordStrength value={maxRulesPassword} maxRules={0} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-maxrules-2">Password</Label>
                    <PasswordInput
                      id="demo-maxrules-2"
                      value={maxRulesPassword}
                      onChange={(e) => setMaxRulesPassword(e.target.value)}
                      visible={maxRulesVisible}
                      onToggleVisible={() => setMaxRulesVisible((v) => !v)}
                    />
                    <PasswordStrength value={maxRulesPassword} maxRules={2} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-maxrules-3">Password</Label>
                    <PasswordInput
                      id="demo-maxrules-3"
                      value={maxRulesPassword}
                      onChange={(e) => setMaxRulesPassword(e.target.value)}
                      visible={maxRulesVisible}
                      onToggleVisible={() => setMaxRulesVisible((v) => !v)}
                    />
                    <PasswordStrength value={maxRulesPassword} maxRules={3} />
                  </div>
                </div>
              }
            />
          </div>

          {/* Bar Mode */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              barMode
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose between segmented bars (default) or a continuous rounded
              bar.
            </p>
            <CodeBlock
              code={barModeExample}
              onReset={() => setBarModePassword(DEFAULT_BARMODE)}
              preview={
                <div className="space-y-12">
                  <div className="space-y-2">
                    <Label htmlFor="demo-barmode-default">Default</Label>
                    <PasswordInput
                      id="demo-barmode-default"
                      value={barModePassword}
                      onChange={(e) => setBarModePassword(e.target.value)}
                      visible={barModeVisible}
                      onToggleVisible={() => setBarModeVisible((v) => !v)}
                    />
                    <PasswordStrength
                      value={barModePassword}
                      barMode="default"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-barmode-rounded">Rounded</Label>
                    <PasswordInput
                      id="demo-barmode-rounded"
                      value={barModePassword}
                      onChange={(e) => setBarModePassword(e.target.value)}
                      visible={barModeVisible}
                      onToggleVisible={() => setBarModeVisible((v) => !v)}
                    />
                    <PasswordStrength
                      value={barModePassword}
                      barMode="rounded"
                    />
                  </div>
                </div>
              }
            />
          </div>

          {/* Rules Background */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              rulesBackground
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add a card background around the rules section. Pass a Tailwind
              class string or an object with light/dark CSS colors.
            </p>
            <CodeBlock
              code={rulesBgExample}
              onReset={() => setRulesBgPassword(DEFAULT_RULESBG)}
              preview={
                <div className="space-y-2">
                  <Label htmlFor="demo-rulesbg">Password</Label>
                  <PasswordInput
                    id="demo-rulesbg"
                    value={rulesBgPassword}
                    onChange={(e) => setRulesBgPassword(e.target.value)}
                  />
                  <PasswordStrength
                    value={rulesBgPassword}
                    rulesBackground="bg-[#f9f9f9] dark:bg-[#eeeeee0f]"
                  />
                </div>
              }
            />
          </div>

          {/* Bars Number */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              barsNumber
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose between 3, 4, or 5 strength bars.
            </p>
            <CodeBlock
              code={barsNumberExample}
              onReset={() => setBarsPassword(DEFAULT_BARS)}
              preview={
                <div className="space-y-12">
                  <div className="space-y-2">
                    <Label htmlFor="demo-bars-3">Password</Label>
                    <PasswordInput
                      id="demo-bars-3"
                      value={barsPassword}
                      onChange={(e) => setBarsPassword(e.target.value)}
                      visible={barsVisible}
                      onToggleVisible={() => setBarsVisible((v) => !v)}
                    />
                    <PasswordStrength
                      value={barsPassword}
                      barsNumber={3}
                      maxRules={0}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-bars-4">Password</Label>
                    <PasswordInput
                      id="demo-bars-4"
                      value={barsPassword}
                      onChange={(e) => setBarsPassword(e.target.value)}
                      visible={barsVisible}
                      onToggleVisible={() => setBarsVisible((v) => !v)}
                    />
                    <PasswordStrength
                      value={barsPassword}
                      barsNumber={4}
                      maxRules={0}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-bars-5">Password</Label>
                    <PasswordInput
                      id="demo-bars-5"
                      value={barsPassword}
                      onChange={(e) => setBarsPassword(e.target.value)}
                      visible={barsVisible}
                      onToggleVisible={() => setBarsVisible((v) => !v)}
                    />
                    <PasswordStrength
                      value={barsPassword}
                      barsNumber={5}
                      maxRules={0}
                    />
                  </div>
                </div>
              }
            />
          </div>

          {/* Email Check */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Check email pattern in password
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Detects any 4+ consecutive characters from the email. Try
              &quot;john&quot;, &quot;ndoe&quot;, or &quot;hndo&quot;.
            </p>
            <CodeBlock
              code={emailExample}
              onReset={() => {
                setEmailValue(DEFAULT_EMAIL);
                setEmailPassword(DEFAULT_EMAIL_PWD);
              }}
              preview={
                <div className="space-y-4 pb-4 pt-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="demo-email">Email</Label>
                    <Input
                      id="demo-email"
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-email-pwd">Password</Label>
                    <PasswordInput
                      id="demo-email-pwd"
                      value={emailPassword}
                      onChange={(e) => setEmailPassword(e.target.value)}
                    />
                    <PasswordStrength
                      value={emailPassword}
                      email={emailValue}
                      maxRules={2}
                    />
                  </div>
                </div>
              }
            />
          </div>

          {/* Multi-language Support */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Multi-language Support
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {(Object.keys(localeLabels) as Locale[]).map((locale) => (
                <button
                  key={locale}
                  onClick={() => setSelectedLocale(locale)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    selectedLocale === locale
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {flags[locale]}
                  {localeLabels[locale]}
                </button>
              ))}
            </div>
            <CodeBlock
              code={generateLocaleExample(selectedLocale)}
              onReset={() => setLocalePassword(DEFAULT_LOCALE_PWD)}
              preview={
                <div className="space-y-2">
                  <Label htmlFor="demo-locale">Password</Label>
                  <PasswordInput
                    id="demo-locale"
                    value={localePassword}
                    onChange={(e) => setLocalePassword(e.target.value)}
                  />
                  <PasswordStrength
                    value={localePassword}
                    locale={selectedLocale}
                  />
                </div>
              }
            />
          </div>
        </section>

        {/* Props */}
        <section
          id="props"
          className="py-12 border-t border-gray-200 dark:border-gray-800 space-y-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Props
          </h2>

          {/* Customization Props */}
          <div className="bg-white dark:bg-gray-950 border border-gray-200/60 dark:border-gray-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Customization
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                      Prop
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                      Type
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                      Default
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      locale
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400 text-xs">{`"en" | "fr" | ... | "ko"`}</td>
                    <td className="py-2 px-3 text-gray-500">{`"en"`}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      13 languages supported
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      barMode
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400 text-xs">{`"default" | "rounded"`}</td>
                    <td className="py-2 px-3 text-gray-500">{`"default"`}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Visual bar mode variant
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      rulesBackground
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400 text-xs">{`string | { light, dark }`}</td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Wraps rules in a card with background. Pass Tailwind
                      classes{" "}
                      <code className="text-xs font-mono text-gray-500">{`"bg-zinc-100 dark:bg-zinc-900"`}</code>{" "}
                      or CSS colors{" "}
                      <code className="text-xs font-mono text-gray-500">{`{ light: "#f5f5f5", dark: "#1c1c1c" }`}</code>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      barsNumber
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      3 | 4 | 5
                    </td>
                    <td className="py-2 px-3 text-gray-500">5</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Number of bars
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      maxRules
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      number
                    </td>
                    <td className="py-2 px-3 text-gray-500">2</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Rules shown, 0 = bar only
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Common Props */}
          <div className="bg-white dark:bg-gray-950 border border-gray-200/60 dark:border-gray-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Common
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                      Prop
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                      Type
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                      Default
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      value
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      string
                    </td>
                    <td className="py-2 px-3 text-gray-500">required</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Password value
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      email
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      string
                    </td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Check email text pattern in password
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      forbiddenWords
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      string[]
                    </td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Words to exclude
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      className
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      string
                    </td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Container class name
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      barClassName
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      string
                    </td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Strength bar class name
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Full width */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {"Built by "}
            <a
              href="https://github.com/SamuelPrigent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Samuel Prigent
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/SamuelPrigent/pass-strength-indicator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/package/pass-strength-indicator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="npm package"
            >
              <svg
                className="w-8 h-8"
                viewBox="0 0 780 250"
                fill="currentColor"
              >
                <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
