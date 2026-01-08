# shadcn-password-strength

A customizable password strength indicator component for React with multi-language support

[![npm version](https://img.shields.io/npm/v/shadcn-password-strength.svg)](https://www.npmjs.com/package/shadcn-password-strength)
[![license](https://img.shields.io/npm/l/shadcn-password-strength.svg)](https://github.com/SamuelPrigent/shadcn-password-strength/blob/main/LICENSE)

## Features

- **8 languages** supported: English, French, Spanish, German, Portuguese, Italian, Dutch, Polish
- **Flexible display**: Show 0-5 validation rules, or bar-only mode
- **Configurable strength levels**: 3, 4, or 5 bars
- **Email pattern detection**: Prevents users from using parts of their email in passwords
- **Forbidden words**: Block specific words from being used
- **shadcn/ui integration**: Uses your own Input/Label components for consistent styling
- **Dark mode** support out of the box
- **Fully typed** with TypeScript

## Installation

```bash
# 1. Install shadcn/ui components (if not already installed)
npx shadcn@latest add input label

# 2. Install the package
npm install shadcn-password-strength
```

## Quick Start

```tsx
import { useState } from 'react';
import { PasswordStrength } from 'shadcn-password-strength';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PasswordForm() {
  const [password, setPassword] = useState('');

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

Set `maxRules={0}` to hide validation rules and show only the strength bar:

```tsx
<PasswordStrength
  value={password}
  onChange={setPassword}
  maxRules={0}
  InputComponent={Input}
  LabelComponent={Label}
/>
```

### Multi-language Support

Available locales: `en`, `fr`, `es`, `de`, `pt`, `it`, `nl`, `pl`

```tsx
<PasswordStrength
  value={password}
  onChange={setPassword}
  locale="de"
  InputComponent={Input}
  LabelComponent={Label}
/>
```

### Email Pattern Detection

Prevents users from including any 4+ consecutive characters from their email:

```tsx
<PasswordStrength
  value={password}
  onChange={setPassword}
  email="johndoe@example.com"
  InputComponent={Input}
  LabelComponent={Label}
/>
```

### Custom Number of Bars

Choose between 3, 4, or 5 strength bars:

```tsx
<PasswordStrength
  value={password}
  onChange={setPassword}
  barsNumber={3}
  InputComponent={Input}
  LabelComponent={Label}
/>
```

### Full Configuration

```tsx
<PasswordStrength
  value={password}
  onChange={setPassword}
  locale="fr"
  barsNumber={5}
  maxRules={3}
  email="user@example.com"
  forbiddenWords={['password', 'company']}
  InputComponent={Input}
  LabelComponent={Label}
/>
```

## Props

### Required

| Prop       | Type                      | Description      |
| ---------- | ------------------------- | ---------------- |
| `value`    | `string`                  | Password value   |
| `onChange` | `(value: string) => void` | Change callback  |

### Shadcn Components

| Prop             | Type        | Description                     |
| ---------------- | ----------- | ------------------------------- |
| `InputComponent` | `Component` | Your Input from @/components/ui |
| `LabelComponent` | `Component` | Your Label from @/components/ui |

### Package Customization

| Prop          | Type                                                           | Default | Description                               |
| ------------- | -------------------------------------------------------------- | ------- | ----------------------------------------- |
| `locale`      | `"en" \| "fr" \| "es" \| "de" \| "pt" \| "it" \| "nl" \| "pl"` | `"en"`  | Language for labels and messages          |
| `barsNumber`  | `3 \| 4 \| 5`                                                  | `5`     | Number of strength indicator bars         |
| `maxRules`    | `number`                                                       | `2`     | Max validation rules shown (0 = bar only) |
| `placeholder` | `string`                                                       | -       | Input placeholder text                    |
| `label`       | `string`                                                       | -       | Input label text                          |

### Utility

| Prop             | Type       | Description                                    |
| ---------------- | ---------- | ---------------------------------------------- |
| `email`          | `string`   | Detects 4+ consecutive chars from email        |
| `forbiddenWords` | `string[]` | Words that cannot be in the password (-2 score)|

## Password Rules

The component validates passwords against these rules:

1. **Minimum length**: At least 12 characters
2. **Uppercase**: At least one uppercase letter
3. **Lowercase**: At least one lowercase letter
4. **Number**: At least one digit
5. **Special character**: At least one special character
6. **No email pattern** (optional): No 4+ consecutive characters from email
7. **No forbidden words** (optional): None of the specified forbidden words

## Documentation

For full documentation and live examples, visit the [documentation site](https://shadcn-password-strength.vercel.app).

## License

MIT
