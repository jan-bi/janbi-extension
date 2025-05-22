import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import babelParser from "@babel/eslint-parser";
import globals from "globals";

export default [
  {
    ignores: ["dist/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        process: true,
        __API_BASE_URL__: "readonly",
        __CLIENT_URL__: "readonly",
        __SLACK_CLIENT_ID__: "readonly",
        __REDIRECT_URI__: "readonly",
        ...globals.browser,
        ...globals.webextensions,
        chrome: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      prettier,
      "unused-imports": unusedImports,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "unused-imports/no-unused-imports": "warn",
      "import/no-extraneous-dependencies": "off",
      "react/jsx-props-no-spreading": "off",
      "react/react-in-jsx-scope": "off",
      "react/button-has-type": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "prefer-arrow-callback": "off",
      "prettier/prettier": "error",
      "import/order": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
