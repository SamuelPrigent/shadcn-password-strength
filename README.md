# shadcn-password-strength

A customizable password strength indicator component for React with multi-language support.

[![npm version](https://img.shields.io/npm/v/shadcn-password-strength.svg)](https://www.npmjs.com/package/shadcn-password-strength)
[![license](https://img.shields.io/npm/l/shadcn-password-strength.svg)](https://github.com/SamuelPrigent/shadcn-password-strength/blob/main/LICENSE)

## Why

There's no password strength component in shadcn/ui. This package provides a customizable, accessible password strength indicator that integrates seamlessly with your existing shadcn/ui setup.

## Features

- Multi-language support (English, French, Spanish)
- Multiple display modes (`full` with rules, `bar-only`)
- Configurable strength levels (3, 4, or 5 bars)
- Uses your own shadcn Input/Label components for consistent styling
- Dark mode support
- Fully typed with TypeScript

## Usage

### 1. Install dependencies

```bash
npx shadcn@latest add input label
npm install shadcn-password-strength
```

### 2. Use the component

```tsx
import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PasswordForm() {
  const [password, setPassword] = useState("");

  return (
    <PasswordStrength
      value={password}
      onChange={setPassword}
      InputComponent={Input}
      LabelComponent={Label}
    />
  );
}
```

## Examples

### Bar Only Mode

```tsx
<PasswordStrength
  value={password}
  onChange={setPassword}
  mode="bar-only"
  InputComponent={Input}
  LabelComponent={Label}
/>
```

### French Locale

```tsx
<PasswordStrength
  value={password}
  onChange={setPassword}
  locale="fr"
  InputComponent={Input}
  LabelComponent={Label}
/>
```

### With Email Validation

Prevent users from including their email in the password:

```tsx
<PasswordStrength
  value={password}
  onChange={setPassword}
  email="user@example.com"
  InputComponent={Input}
  LabelComponent={Label}
/>
```

### Full Configuration

```tsx
<PasswordStrength
  value={password}
  onChange={setPassword}
  locale="en"
  mode="full"
  levels={5}
  maxRules={3}
  email="user@example.com"
  InputComponent={Input}
  LabelComponent={Label}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Password value |
| `onChange` | `(value: string) => void` | - | Change callback |
| `locale` | `"en" \| "fr" \| "es"` | `"en"` | Language |
| `mode` | `"full" \| "bar-only"` | `"full"` | Display mode |
| `levels` | `3 \| 4 \| 5` | `5` | Number of strength bars |
| `maxRules` | `number` | `2` | Max rules shown in full mode |
| `email` | `string` | - | Email to check against |
| `forbiddenWords` | `string[]` | - | Words to exclude |
| `hideInput` | `boolean` | `false` | Hide the input field |
| `InputComponent` | `Component` | - | Your shadcn Input component |
| `LabelComponent` | `Component` | - | Your shadcn Label component |

## Documentation

For full documentation and live examples, visit the [documentation site](https://shadcn-password-strength.vercel.app).

## License

MIT
