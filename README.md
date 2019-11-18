[![npm package](https://badge.fury.io/js/intl-ts.svg)](https://www.npmjs.com/package/intl-ts)
[![license](https://img.shields.io/github/license/sveyret/intl-ts.svg)](https://github.com/sveyret/intl-ts/blob/master/LICENSE)
[![build](https://api.travis-ci.org/sveyret/intl-ts.svg?branch=master)](https://travis-ci.org/sveyret/intl-ts)
[![coverage](https://coveralls.io/repos/github/sveyret/intl-ts/badge.svg?branch=master)](https://coveralls.io/github/sveyret/intl-ts)
[![issues](https://img.shields.io/github/issues/sveyret/intl-ts.svg)](https://github.com/sveyret/intl-ts/issues)

# intl-ts - Typesafe internationalization library

intl-ts is an i18n (internationlization) library for TypeScript. The package is compiled in ES2015 and so can also be used by JavaScript applications, but may require a Babel translation to be used with browsers. Its main features are:

- Type safe: using a wrong message name or the wrong type for the parameters will be checked at compile time. If your IDE allow it, you may even have completion for message names.
- Mutable or immutable: the library can be used in an immutable way (good for most state-aware framework, like React/Redux), or in a mutable way (for better performance).
- MobX integration: if you are using MobX, the `$preferences` property of the `Intl` object will automatically become observable, allowing, for example, `React` components to automatically refresh when chosen language changes.
- Agnostic: can be used both at server (NodeJS) or browser side.

If you were using a previous version of the library, you may be interested by the [migration guide](doc/migrate.md)

# Installation

Installation is done using `npm install` command:

```bash
$ npm install --save intl-ts
```

If you prefer using `yarn`:

```bash
$ yarn add intl-ts
```

# Language/langue

Because French is my native language, finding all documents and messages in French is not an option. Other translations are welcome.

Anyway, because English is the language of programming, the code, including variable names and comments, are in English.

:fr: Une version française de ce document se trouve [ici](doc/fr/README.md).

# Usage

- Create your language strings (messages):

```typescript
// English version — default
const en = {
  $: 'English',
  welcome: 'Welcome!',
  hello: (name: string) => `Hello ${name}`,
  showElementCount: (count: number) => {
    switch (count) {
      case 0: {
        return 'There are no elements'
      }
      case 1: {
        return 'There is one element'
      }
      default: {
        return `There are ${count} elements`
      }
    }
  },
}

// Type describing messages
type langType = typeof en

// French version — full
const fr: langType = {
  $: 'Français',
  welcome: 'Bienvenue !',
  hello: (name: string) => `Bonjour ${name}`,
  showElementCount: (count: number) => {
    switch (count) {
      case 0: {
        return 'Il n’y a pas d’éléments'
      }
      case 1: {
        return 'Il y a un élément'
      }
      default: {
        return `Il y a ${count} elements`
      }
    }
  },
}

// Canada french version — partial
const fr_ca: PartialMessages<langType> = {
  $: 'Français (Canada)',
  hello: (name: string) => `Allo ${name}`,
}

// Esperanto version — partial
const eo: PartialMessages<langType> = {
  $: 'Esperanto',
  welcome: 'Bonvenon!',
  hello: (name: string) => `Saluton ${name}`,
}
```

Note that the message names _must not contain one of the keyword_ of the [Intl API](doc/api.md#intlt-extends-messages).

- Create the corresponding language map:

```typescript
// Direct creation
const languageMap = new LanguageMap({
  default: en,
  en: 'default',
  fr,
  fr_ca,
  eo,
})

// Dynamic creation
const languageMap = new LanguageMap(en, 'en').merge({ fr, fr_ca }).merge({ eo })
```

Note that you should only use lowercases, digits and underscores as keys in language maps, because language codes will be formatted this way by the `Intl` class.

- Create the internationalization object, and use it!

```typescript
const lang = new Intl<langType>(languageMap, ['eo', 'fr-CA'])
lang.welcome() // 'Bonvenon!'
lang.showElementCount(0) // 'Il n’y a pas d’éléments' — Compilation check that 0 is of type number
```

# Mutability

Object states will never change except:

- Internal string representation of the `LanguageMap` (because of lazy initialization),
- if you choose to update the language preferences with `Intl.$changePreferences`.

A new object is created when calling `LanguageMap.merge()`, and language preferences can be updated cloning the international object with `new Intl`.

# Documentation

- [API documentation](doc/api.md)
- [Code snippets](doc/tips.md)
