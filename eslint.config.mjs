import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import sortKeysPlugin from "eslint-plugin-sort-keys-fix";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser
    },
    plugins: {
      "sort-keys-fix": sortKeysPlugin
    },
    rules: {
      "no-missing-end-of-source-newline": "off",
      "@typescript-eslint/member-ordering": ["error", {
        default: {
          memberTypes: [
            "signature",
            "field",
            "constructor",
            "method"
          ],
          order: "alphabetically"
        }
      }],
      "@typescript-eslint/sort-type-constituents": "error",
      "sort-keys": ["error", "asc", {
        caseSensitive: true,
        minKeys: 2,
        natural: true
      }],
      "sort-keys-fix/sort-keys-fix": ["error", {
        caseSensitive: true
      }]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended
];
