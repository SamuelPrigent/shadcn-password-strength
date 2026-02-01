# Contributing to pass-strength-indicator

Thank you for your interest in contributing! This document provides guidelines and instructions.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamuelPrigent/pass-strength-indicator.git
   cd pass-strength-indicator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The demo site will be available at `http://localhost:4125`

## Project Structure

```
pass-strength-indicator/
├── src/
│   ├── lib/                    # Package source code
│   │   ├── PasswordStrength.tsx  # Main component
│   │   ├── usePasswordStrength.ts # Hook
│   │   ├── rules.ts              # Validation rules
│   │   ├── types.ts              # TypeScript types
│   │   ├── icons.tsx             # Icon components
│   │   ├── translations/         # Lazy-loaded translations
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   └── {locale}.ts
│   │   ├── __tests__/            # Unit tests
│   │   └── index.ts              # Package exports
│   ├── app/                    # Next.js demo site
│   └── components/             # Demo site components
├── vitest.config.ts
├── tsup.config.ts
└── package.json
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build the Next.js demo site |
| `npm run build:lib` | Build the npm package (dist/) |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |

## Contributing Guidelines

### Adding a New Language

1. Create a new translation file in `src/lib/translations/`:
   ```typescript
   // src/lib/translations/{locale}.ts
   import type { Translation } from './types';

   export const {locale}: Translation = {
     levels: {
       veryWeak: '...',
       weak: '...',
       soso: '...',
       good: '...',
       strong: '...',
     },
     passwordMustInclude: '...',
     passwordStrength: '...',
     rules: {
       minLength: '...',
       uppercase: '...',
       lowercase: '...',
       number: '...',
       special: '...',
       noEmail: '...',
       noForbiddenWords: '...',
     },
   };
   ```

2. Add the locale to the `Locale` type in `src/lib/types.ts`

3. Add the import case in `src/lib/translations/index.ts`

4. (Optional) Add a flag SVG and label in `src/app/page.tsx` for the demo

### Adding a New Validation Rule

1. Add the rule to `src/lib/rules.ts`
2. Add the translation key to `src/lib/translations/types.ts`
3. Add translations for all supported languages
4. Write tests in `src/lib/__tests__/rules.test.ts`

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint)
- Use meaningful variable and function names
- Keep components focused and small

### Testing

- Write tests for any new functionality
- Run `npm run test` before submitting a PR
- Aim for good test coverage on validation logic

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Run the build (`npm run build && npm run build:lib`)
6. Commit your changes with a descriptive message
7. Push to your fork
8. Open a Pull Request

### Commit Messages

Use clear, descriptive commit messages:
- `feat: add Russian translation`
- `fix: correct score calculation for empty passwords`
- `docs: update README with new props`
- `refactor: extract icons to separate file`

## Reporting Issues

When reporting issues, please include:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (browser, OS, package version)

## Questions?

Feel free to open an issue for any questions about contributing.
