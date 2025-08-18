# TenEyck Family Tree

This repository contains a generated YAML representation of the TenEyck family tree and a React app (PrimeReact) that renders it.

- Source text was provided in an attached scratch file (WebStorm scratches: early.txt) using leading dots for hierarchy and plus signs for spouses.
- The YAML export preserves the original line content in a `name` field (formerly `text`). The `name` has any trailing birth/death years removed. Flags: `isSpouse` and `isNote`.
- The script also parses birth/death years from trailing patterns like "1617 - 1686" and adds `birthYear` and `deathYear` (null when unknown/missing).
- The top-level structure is:
  - `title`: string
  - `children`: nested list where each item is `{ name: string, generation?: number, isSpouse?: boolean, isNote?: boolean, birthYear?: number|null, deathYear?: number|null, children?: [...] }`

Files:
- data/teneyck-tree.yaml — generated YAML output.
- scripts/convert-tree-to-yaml.js — Node script to regenerate the YAML from the embedded source text.
- src/components/FamilyTree.tsx — React component that loads and renders the YAML using PrimeReact Tree.

## Run the app

1. Install dependencies:
   - npm install
2. Start the dev server:
   - npm run dev
3. Open the app in the browser (the dev server will print the URL).

The app loads data/teneyck-tree.yaml by default (fetched at /data/teneyck-tree.yaml). You can also paste YAML into the textarea and click "Parse from text" to render custom YAML of the same shape.

Note: When building for production, ensure the YAML file is served from the same server path (/data/teneyck-tree.yaml). For static hosting, you may move the YAML file into /public and update the fetch path accordingly.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
