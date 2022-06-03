//eslint-disable-next-line no-undef
module.exports = {
  "plugins": [
    "react-hooks"
  ],
  "parser": '@babel/eslint-parser',
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
},
}