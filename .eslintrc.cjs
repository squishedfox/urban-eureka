module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "perfectionist"],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "perfectionist/sort-imports": [
      "warn",
      {
        type: "natural",
        order: "asc",
        groups: [
          "type", // type imports
          "react-group", // react & react-*
          "builtin", // node builtins
          "external", // npm packages
          "internal", // your own modules (~/, @/, etc.)
          ["parent", "sibling", "index"], // relative imports
          "side-effect-style", // import './styles.css'
          "style", // import styles from './x.css'
          "unknown",
        ],
        customGroups: [
          {
            groupName: "react-group",
            elementNamePattern: ["^react$", "^react-", "^react-dom"],
          },
        ],
        "newlines-between": "always",
        internalPattern: ["^~/.+", "^@/.+"],
      },
    ],
  },
};
