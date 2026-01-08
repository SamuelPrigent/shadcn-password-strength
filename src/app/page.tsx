"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
// import { TableOfContents } from '@/components/TableOfContents';
import { CodeBlock } from "@/components/CodeBlock";
import { CopyButton } from "@/components/CopyButton";
import { PasswordStrength } from "@/lib";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

// Code examples
const basicExample = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BasicExample() {
  const [password, setPassword] = useState("");

  return (
    <PasswordStrength
      value={password}
      onChange={setPassword}
      InputComponent={Input}
      LabelComponent={Label}
    />
  );
}`;

const maxRulesExample = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MaxRulesExample() {
  // All inputs share the same state for comparison
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-6">
      {/* No rules (bar only) */}
      <PasswordStrength
        value={password}
        onChange={setPassword}
        maxRules={0}
        InputComponent={Input}
        LabelComponent={Label}
      />

      {/* 2 rules */}
      <PasswordStrength
        value={password}
        onChange={setPassword}
        maxRules={2}
        InputComponent={Input}
        LabelComponent={Label}
      />

      {/* 3 rules */}
      <PasswordStrength
        value={password}
        onChange={setPassword}
        maxRules={3}
        InputComponent={Input}
        LabelComponent={Label}
      />
    </div>
  );
}`;

const barsNumberExample = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BarsNumberExample() {
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-6">
      {/* 3 bars */}
      <PasswordStrength
        value={password}
        onChange={setPassword}
        barsNumber={3}
        maxRules={0}
        InputComponent={Input}
        LabelComponent={Label}
      />

      {/* 4 bars */}
      <PasswordStrength
        value={password}
        onChange={setPassword}
        barsNumber={4}
        maxRules={0}
        InputComponent={Input}
        LabelComponent={Label}
      />

      {/* 5 bars (default) */}
      <PasswordStrength
        value={password}
        onChange={setPassword}
        barsNumber={5}
        maxRules={0}
        InputComponent={Input}
        LabelComponent={Label}
      />
    </div>
  );
}`;

const emailExample = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmailCheckExample() {
  const [email, setEmail] = useState("johndoe@mail.com");
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <PasswordStrength
        value={password}
        onChange={setPassword}
        email={email}
        maxRules={3}
        InputComponent={Input}
        LabelComponent={Label}
      />
    </div>
  );
}`;

// Locale configuration with inline SVG flags
type SupportedLocale = "en" | "fr" | "es" | "de" | "pt" | "it" | "nl" | "pl";

const flags: Record<SupportedLocale, React.ReactNode> = {
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
};

const localeLabels: Record<SupportedLocale, string> = {
  en: "en",
  fr: "fr",
  es: "es",
  de: "de",
  pt: "pt",
  it: "it",
  nl: "nl",
  pl: "pl",
};

// Generate locale example code
const generateLocaleExample = (
  locale: SupportedLocale
) => `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Example() {
  const [password, setPassword] = useState("");

  return (
    <PasswordStrength
      value={password}
      onChange={setPassword}
      locale="${locale}"
      InputComponent={Input}
      LabelComponent={Label}
    />
  );
}`;

// Default values for examples
const DEFAULT_BASIC = "MyP@ssw0rd123";
const DEFAULT_MAX_RULES = "Str0ng!Pass";
const DEFAULT_BARS = "Test@123";
const DEFAULT_EMAIL = "johndoe@mail.com";
const DEFAULT_EMAIL_PWD = "ndoe9120*JOk";
const DEFAULT_LOCALE_PWD = "MonMotDePasse";

export default function Home() {
  const [basicPassword, setBasicPassword] = useState(DEFAULT_BASIC);
  const [maxRulesPassword, setMaxRulesPassword] = useState(DEFAULT_MAX_RULES);
  const [barsPassword, setBarsPassword] = useState(DEFAULT_BARS);
  const [emailValue, setEmailValue] = useState(DEFAULT_EMAIL);
  const [emailPassword, setEmailPassword] = useState(DEFAULT_EMAIL_PWD);
  const [selectedLocale, setSelectedLocale] = useState<SupportedLocale>("en");
  const [localePassword, setLocalePassword] = useState(DEFAULT_LOCALE_PWD);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Theme Toggle - Sticky top right */}
      <ThemeToggle />

      {/* Table of Contents - Right sidebar */}
      {/* <TableOfContents /> */}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero with Basic Example */}
        <section className="py-8">
          <div className="text-center mb-5">
            <Image
              className="mx-auto mb-6"
              width={56}
              height={56}
              src="/npm.svg"
              alt="logo"
            />
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">
              shadcn-password-strength
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              A customizable, accessible password strength component for React.
              Multi-language support, multiple display modes, and dark mode.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 mt-2 mb-10">
            <a
              href="#setup"
              className="px-5 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
            >
              Get Started
            </a>
            <a
              href="https://github.com/SamuelPrigent/shadcn-password-strength"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm"
            >
              GitHub
            </a>
          </div>

          {/* Basic Example - Featured */}
          <CodeBlock
            code={basicExample}
            onReset={() => setBasicPassword(DEFAULT_BASIC)}
            preview={
              <PasswordStrength
                value={basicPassword}
                onChange={setBasicPassword}
                InputComponent={Input}
                LabelComponent={Label}
              />
            }
          />
        </section>

        {/* Setup */}
        <section id="setup" className="py-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Setup
          </h2>

          <div className="space-y-6">
            {/* Step 1: Tailwind */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                1. Make sure Tailwind CSS is installed
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                If not, follow the{" "}
                <a
                  href="https://tailwindcss.com/docs/installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 dark:text-gray-100 underline"
                >
                  Tailwind CSS installation guide
                </a>
              </p>
            </div>

            {/* Step 2: shadcn/ui */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                2. Initialize shadcn/ui
              </h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                  <code>npx shadcn@latest init</code>
                </pre>
                <CopyButton
                  text="npx shadcn@latest init"
                  className="absolute top-2 right-2"
                />
              </div>
            </div>

            {/* Step 3: Install shadcn components */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                3. Add Input and Label components
              </h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                  <code>npx shadcn@latest add input label</code>
                </pre>
                <CopyButton
                  text="npx shadcn@latest add input label"
                  className="absolute top-2 right-2"
                />
              </div>
            </div>

            {/* Step 4: Install package */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                4. Install the package
              </h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                  <code>npm install shadcn-password-strength</code>
                </pre>
                <CopyButton
                  text="npm install shadcn-password-strength"
                  className="absolute top-2 right-2"
                />
              </div>
            </div>

            {/* Step 5: Import and use */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                5. Import and use
              </h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                  <code>{`import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";`}</code>
                </pre>
                <CopyButton
                  text={`import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";`}
                  className="absolute top-2 right-2"
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
            More Examples
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
                  <PasswordStrength
                    value={maxRulesPassword}
                    onChange={setMaxRulesPassword}
                    maxRules={0}
                    InputComponent={Input}
                    LabelComponent={Label}
                  />
                  <PasswordStrength
                    value={maxRulesPassword}
                    onChange={setMaxRulesPassword}
                    maxRules={2}
                    InputComponent={Input}
                    LabelComponent={Label}
                  />
                  <PasswordStrength
                    value={maxRulesPassword}
                    onChange={setMaxRulesPassword}
                    maxRules={3}
                    InputComponent={Input}
                    LabelComponent={Label}
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
                  <PasswordStrength
                    value={barsPassword}
                    onChange={setBarsPassword}
                    barsNumber={3}
                    maxRules={0}
                    InputComponent={Input}
                    LabelComponent={Label}
                  />
                  <PasswordStrength
                    value={barsPassword}
                    onChange={setBarsPassword}
                    barsNumber={4}
                    maxRules={0}
                    InputComponent={Input}
                    LabelComponent={Label}
                  />
                  <PasswordStrength
                    value={barsPassword}
                    onChange={setBarsPassword}
                    barsNumber={5}
                    maxRules={0}
                    InputComponent={Input}
                    LabelComponent={Label}
                  />
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
                  <PasswordStrength
                    value={emailPassword}
                    onChange={setEmailPassword}
                    email={emailValue}
                    maxRules={2}
                    InputComponent={Input}
                    LabelComponent={Label}
                  />
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
              {(Object.keys(localeLabels) as SupportedLocale[]).map(
                (locale) => (
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
                )
              )}
            </div>
            <CodeBlock
              code={generateLocaleExample(selectedLocale)}
              onReset={() => setLocalePassword(DEFAULT_LOCALE_PWD)}
              preview={
                <PasswordStrength
                  value={localePassword}
                  onChange={setLocalePassword}
                  locale={selectedLocale}
                  InputComponent={Input}
                  LabelComponent={Label}
                />
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
          <div className="space-y-3">
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
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400 text-xs">{`"en" | "fr" | "es" | "de" | "pt" | "it" | "nl" | "pl"`}</td>
                    <td className="py-2 px-3 text-gray-500">{`"en"`}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Language
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
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      InputComponent
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      Component
                    </td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Input shadcn from /ui
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      LabelComponent
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      Component
                    </td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Label shadcn from /ui
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Common Props */}
          <div className="space-y-3">
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
                      onChange
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">{`(value) => void`}</td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Change callback
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
                      Check email text pattern un password
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
                      placeholder
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      string
                    </td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Input placeholder
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                      label
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                      string
                    </td>
                    <td className="py-2 px-3 text-gray-500">-</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      Input label
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Full width */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {"Built by "}
            <a
              href="https://github.com/SamuelPrigent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {/* Samuel Prigent */}
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/SamuelPrigent/shadcn-password-strength"
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
              href="https://www.npmjs.com/package/shadcn-password-strength"
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
