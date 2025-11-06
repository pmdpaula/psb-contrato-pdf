import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier";
import globals from "globals";
import { configs } from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  // importPlugin.flatConfigs.recommended,
  // eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  ...configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
      },
      globals: globals.es2021,
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
      pluginJs: js,
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          // vars: "all",
          // args: "after-used",
          // ignoreRestSiblings: true,
        },
      ],
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "import/first": "error",
      "import/newline-after-import": "warn",
      "import/no-duplicates": "error",
      // "prettier/prettier": "warn",
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
]);
