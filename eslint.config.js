import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astroParser from "astro-eslint-parser";
import astroPlugin from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**/*"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Astro config
  {
    files: ["*.astro"],
    parser: astroParser,
    parserOptions: {
      parser: "@typescript-eslint/parser",
      extraFileExtensions: [".astro"],
    },
    processor: astroPlugin.processor,
    plugins: ["astro"],
    extends: ["plugin:astro/recommended", "plugin:astro/jsx-a11y-recommended"],
    rules: {
      // Add custom rules for .astro files here
      "astro/no-unused-css-selector": "error",
      "astro/no-unused-define-vars-in-style": "error",
      "astro/no-conflict-set-directives": "error",
      "astro/prefer-class-list-directive": "warn",
      "astro/semi": ["error", "always"],
    },
  },

  // Configuration for TypeScript files
  {
    files: ["*.ts", "*.tsx"],
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    parserOptions: {
      project: "./tsconfig.json",
    },
    rules: {
      // Add custom TypeScript rules here
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Configuration for JavaScript/JSX files
  {
    files: ["*.js", "*.jsx"],
    rules: {
      // Add custom JavaScript rules here
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
