module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "no-debugger": "off",
    "no-console": "off",
    "no-unused-vars": "warn",
    "react/prop-types": "warn"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
