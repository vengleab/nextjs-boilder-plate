module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "no-console": 1,
    "react/display-name": 0,
    // no need this as we will soon use typescript
    "react/prop-types": 0
  }
};
