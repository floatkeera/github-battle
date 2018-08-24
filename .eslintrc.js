module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd": true
    },
    "extends": [
        "eslint:recommended",
        'plugin:react/recommended',
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "ecmaVersion": 2017
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-vars": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};