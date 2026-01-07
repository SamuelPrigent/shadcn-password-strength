import type { Locale, StrengthLevel } from './types';

export interface Translation {
  levels: Record<StrengthLevel, string>;
  passwordMustInclude: string;
  passwordStrength: string;
  rules: {
    minLength: string;
    uppercase: string;
    lowercase: string;
    number: string;
    special: string;
    noEmail: string;
    noForbiddenWords: string;
  };
  placeholder: string;
  label: string;
}

export const translations: Record<Locale, Translation> = {
  en: {
    levels: {
      veryWeak: 'Very Weak',
      weak: 'Weak',
      soso: 'Mid',
      good: 'Good',
      strong: 'Strong',
    },
    passwordMustInclude: 'Your Password must include',
    passwordStrength: 'Password Strength',
    rules: {
      minLength: 'At least 12 characters',
      uppercase: 'At least one uppercase letter',
      lowercase: 'At least one lowercase letter',
      number: 'At least one number',
      special: 'At least one special character',
      noEmail: 'Must not contain your email',
      noForbiddenWords: 'Must not contain forbidden words',
    },
    placeholder: 'Enter your password',
    label: 'Password',
  },
  fr: {
    levels: {
      veryWeak: 'Très faible',
      weak: 'Faible',
      soso: 'Moyen',
      good: 'Bon',
      strong: 'Fort',
    },
    passwordMustInclude: 'Votre mot de passe doit inclure',
    passwordStrength: 'Sécurité du mot de passe',
    rules: {
      minLength: 'Au moins 12 caractères',
      uppercase: 'Au moins une lettre majuscule',
      lowercase: 'Au moins une lettre minuscule',
      number: 'Au moins un chiffre',
      special: 'Au moins un caractère spécial',
      noEmail: 'Ne doit pas contenir votre email',
      noForbiddenWords: 'Ne doit pas contenir de mots interdits',
    },
    placeholder: 'Entrez votre mot de passe',
    label: 'Mot de passe',
  },
  es: {
    levels: {
      veryWeak: 'Muy débil',
      weak: 'Débil',
      soso: 'Regular',
      good: 'Buena',
      strong: 'Fuerte',
    },
    passwordMustInclude: 'Tu contraseña debe incluir',
    passwordStrength: 'Seguridad de la contraseña',
    rules: {
      minLength: 'Al menos 12 caracteres',
      uppercase: 'Al menos una letra mayúscula',
      lowercase: 'Al menos una letra minúscula',
      number: 'Al menos un número',
      special: 'Al menos un carácter especial',
      noEmail: 'No debe contener tu email',
      noForbiddenWords: 'No debe contener palabras prohibidas',
    },
    placeholder: 'Ingresa tu contraseña',
    label: 'Contraseña',
  },
  de: {
    levels: {
      veryWeak: 'Sehr schwach',
      weak: 'Schwach',
      soso: 'Mittel',
      good: 'Gut',
      strong: 'Stark',
    },
    passwordMustInclude: 'Ihr Passwort muss enthalten',
    passwordStrength: 'Passwortstärke',
    rules: {
      minLength: 'Mindestens 12 Zeichen',
      uppercase: 'Mindestens einen Großbuchstaben',
      lowercase: 'Mindestens einen Kleinbuchstaben',
      number: 'Mindestens eine Zahl',
      special: 'Mindestens ein Sonderzeichen',
      noEmail: 'Darf Ihre E-Mail nicht enthalten',
      noForbiddenWords: 'Darf keine verbotenen Wörter enthalten',
    },
    placeholder: 'Geben Sie Ihr Passwort ein',
    label: 'Passwort',
  },
  pt: {
    levels: {
      veryWeak: 'Muito fraca',
      weak: 'Fraca',
      soso: 'Média',
      good: 'Boa',
      strong: 'Forte',
    },
    passwordMustInclude: 'Sua senha deve incluir',
    passwordStrength: 'Força da senha',
    rules: {
      minLength: 'Pelo menos 12 caracteres',
      uppercase: 'Pelo menos uma letra maiúscula',
      lowercase: 'Pelo menos uma letra minúscula',
      number: 'Pelo menos um número',
      special: 'Pelo menos um caractere especial',
      noEmail: 'Não deve conter seu email',
      noForbiddenWords: 'Não deve conter palavras proibidas',
    },
    placeholder: 'Digite sua senha',
    label: 'Senha',
  },
  it: {
    levels: {
      veryWeak: 'Molto debole',
      weak: 'Debole',
      soso: 'Media',
      good: 'Buona',
      strong: 'Forte',
    },
    passwordMustInclude: 'La tua password deve includere',
    passwordStrength: 'Sicurezza della password',
    rules: {
      minLength: 'Almeno 12 caratteri',
      uppercase: 'Almeno una lettera maiuscola',
      lowercase: 'Almeno una lettera minuscola',
      number: 'Almeno un numero',
      special: 'Almeno un carattere speciale',
      noEmail: 'Non deve contenere la tua email',
      noForbiddenWords: 'Non deve contenere parole vietate',
    },
    placeholder: 'Inserisci la tua password',
    label: 'Password',
  },
  nl: {
    levels: {
      veryWeak: 'Zeer zwak',
      weak: 'Zwak',
      soso: 'Gemiddeld',
      good: 'Goed',
      strong: 'Sterk',
    },
    passwordMustInclude: 'Uw wachtwoord moet bevatten',
    passwordStrength: 'Wachtwoordsterkte',
    rules: {
      minLength: 'Minimaal 12 tekens',
      uppercase: 'Minimaal één hoofdletter',
      lowercase: 'Minimaal één kleine letter',
      number: 'Minimaal één cijfer',
      special: 'Minimaal één speciaal teken',
      noEmail: 'Mag uw e-mail niet bevatten',
      noForbiddenWords: 'Mag geen verboden woorden bevatten',
    },
    placeholder: 'Voer uw wachtwoord in',
    label: 'Wachtwoord',
  },
  pl: {
    levels: {
      veryWeak: 'Bardzo słabe',
      weak: 'Słabe',
      soso: 'Średnie',
      good: 'Dobre',
      strong: 'Silne',
    },
    passwordMustInclude: 'Twoje hasło musi zawierać',
    passwordStrength: 'Siła hasła',
    rules: {
      minLength: 'Co najmniej 12 znaków',
      uppercase: 'Co najmniej jedną wielką literę',
      lowercase: 'Co najmniej jedną małą literę',
      number: 'Co najmniej jedną cyfrę',
      special: 'Co najmniej jeden znak specjalny',
      noEmail: 'Nie może zawierać Twojego emaila',
      noForbiddenWords: 'Nie może zawierać zabronionych słów',
    },
    placeholder: 'Wprowadź hasło',
    label: 'Hasło',
  },
};

export function getTranslation(locale: Locale): Translation {
  return translations[locale] || translations.en;
}
