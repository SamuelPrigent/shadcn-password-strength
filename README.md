# pass-strength-indicator

A customizable, accessible password strength indicator for React. Multi-language support, multiple display modes, and dark mode.

[![npm version](https://img.shields.io/npm/v/pass-strength-indicator.svg)](https://www.npmjs.com/package/pass-strength-indicator)
[![license](https://img.shields.io/npm/l/pass-strength-indicator.svg)](https://github.com/SamuelPrigent/pass-strength-indicator/blob/main/LICENSE)

## Features

- **Indicator-only** — bring your own input, the component only renders the strength bar and rules
- **13 languages** supported: en, fr, es, de, pt, it, nl, pl, sv, uk, zh, ja, ko
- **2 bar modes**: segmented bars (`default`) or continuous rounded bar (`rounded`)
- **Configurable strength levels**: 3, 4, or 5 bars
- **Flexible display**: show 0–5 validation rules, or bar-only mode
- **Email pattern detection**: prevents users from using parts of their email in passwords
- **Forbidden words**: block specific words from being used
- **Dark mode** support out of the box
- **Fully typed** with TypeScript

## Installation

```bash
# 1. Install Tailwind CSS (if not already set up)
# https://tailwindcss.com/docs/installation

# 2. Install the package
npm install pass-strength-indicator
```

## Quick Start

```tsx
import { useState } from "react";
import { PasswordStrength } from "pass-strength-indicator";

export function PasswordForm() {
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
}
```

## Examples

### Bar Only Mode

Set `maxRules={0}` to hide validation rules and show only the strength bar:

```tsx
<PasswordStrength value={password} maxRules={0} />
```

### Rounded Bar Mode

Use `barMode="rounded"` for a continuous rounded bar instead of segmented bars:

```tsx
<PasswordStrength value={password} barMode="rounded" />
```

### Multi-language Support

Available locales: `en`, `fr`, `es`, `de`, `pt`, `it`, `nl`, `pl`, `sv`, `uk`, `zh`, `ja`, `ko`

```tsx
<PasswordStrength value={password} locale="de" />
```

### Email Pattern Detection

Prevents users from including any 4+ consecutive characters from their email:

```tsx
<PasswordStrength value={password} email="johndoe@example.com" />
```

### Custom Number of Bars

Choose between 3, 4, or 5 strength bars:

```tsx
<PasswordStrength value={password} barsNumber={3} maxRules={0} />
```

### Rules Background

Add a card background around the rules section. Independent from `barMode`.

```tsx
{/* Tailwind classes */}
<PasswordStrength
  value={password}
  rulesBackground="bg-zinc-100 dark:bg-zinc-900"
/>

{/* CSS colors (light/dark) */}
<PasswordStrength
  value={password}
  rulesBackground={{ light: "#f5f5f5", dark: "#1c1c1c" }}
/>
```

### Full Configuration

```tsx
<PasswordStrength
  value={password}
  locale="fr"
  barMode="rounded"
  rulesBackground="bg-zinc-100 dark:bg-zinc-900"
  barsNumber={5}
  maxRules={3}
  email="user@example.com"
  forbiddenWords={["password", "company"]}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | required | Password value |
| `locale` | `"en" \| "fr" \| ... \| "ko"` | `"en"` | Language (13 supported) |
| `barMode` | `"default" \| "rounded"` | `"default"` | Segmented bars or continuous rounded bar |
| `rulesBackground` | `string \| { light, dark }` | - | Rules card background (Tailwind or CSS colors) |
| `barsNumber` | `3 \| 4 \| 5` | `5` | Number of strength indicator bars |
| `maxRules` | `number` | `2` | Max validation rules shown (0 = bar only) |
| `email` | `string` | - | Detects 4+ consecutive chars from email |
| `forbiddenWords` | `string[]` | - | Words that cannot be in the password |
| `className` | `string` | - | Additional class name for the container |
| `barClassName` | `string` | - | Additional class name for the strength bars |

## Password Rules

The component validates passwords against these rules:

1. **Minimum length**: at least 12 characters
2. **Uppercase**: at least one uppercase letter
3. **Lowercase**: at least one lowercase letter
4. **Number**: at least one digit
5. **Special character**: at least one special character
6. **No email pattern** (optional): no 4+ consecutive characters from email
7. **No forbidden words** (optional): none of the specified forbidden words

## Documentation

For live examples and interactive demos, visit the [documentation site](https://shadcn-pass-strength.vercel.app).

## License

MIT
