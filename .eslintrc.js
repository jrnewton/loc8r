module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2020": true, 
        "node": true
    },
    /* eslint:recommended property enables rules that report common problems 
       See the list at https://eslint.org/docs/rules/ */
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "strict": [2, "global"]
    },
    "ignorePatterns": [
        "public/javascripts/*.js" /* third party stuff */, 
        ".eslintrc.js" /* ignore self */
    ]
};
