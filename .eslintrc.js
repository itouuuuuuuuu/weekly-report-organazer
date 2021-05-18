module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  plugins: [
    'vue'
  ],
  rules: {
    "object-curly-spacing": [2, "always"],
    "space-before-blocks": "error",
    "space-infix-ops": "error",
    "space-before-function-paren": ["error", "never"],
    "keyword-spacing": ["error", { "overrides": {
      "if": { "after": false },
      "else": { "after": true },
      "switch": { "after": false },
      "for": { "after": false },
      "while": { "after": false }
    } }],
    "no-empty-pattern": "off",
    "no-return-await": "off",
    "indent": [2, 2],
    "semi": "off",
    "@typescript-eslint/semi": ["error"],
    "curly": ["error", "multi-line"],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": false }],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": [1, { "max": 1 }],
    "comma-spacing": [2, { "before": false, "after": true }]
  }
}