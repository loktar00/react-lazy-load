module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    },
    extends: [
        'plugin:react/recommended',
        'airbnb'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        'linebreak-style': 'off',
        'comma-dangle': ['error', 'never'],
        'import/extensions': [
            'error', {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'max-len': ['error', { code: 500 }],
        'arrow-parens': ['error', 'as-needed'],
        'react/function-component-definition': [1, { namedComponents: 'arrow-function' }],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
        'react/jsx-indent-props': [2, 4],
        indent: ['error', 4],
        'react/jsx-indent': [2, 4],
        'react/static-property-placement': [2, 'static public field'],
        'react/no-find-dom-node': 0,
        'jsx-a11y/media-has-caption': 0
    }
};
