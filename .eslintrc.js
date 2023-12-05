const config = {
    extends: ['react-app', 'react-app/jest'],
    rules: {
        curly: ['error'],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:@typescript-eslint/strict',
            ],
            parserOptions: {
                project: ['./tsconfig.json'],
            },
            rules: {
                '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
                '@typescript-eslint/unbound-method': 'off',
                '@typescript-eslint/require-await': 'off',
                '@typescript-eslint/explicit-function-return-type': 'error',
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        default: [
                            'static-field',
                            'public-static-method',
                            'public-instance-field',
                            'protected-instance-field',
                            'private-instance-field',
                            'public-constructor',
                            'public-instance-method',
                            'protected-instance-method',
                            'private-instance-method',
                        ],
                    },
                ],
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: ['class', 'interface', 'typeAlias', 'enum', 'typeParameter'],
                        format: ['PascalCase'],
                        leadingUnderscore: 'forbid',
                        trailingUnderscore: 'forbid',
                    },
                    { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
                    {
                        selector: 'classProperty',
                        format: ['camelCase'],
                        leadingUnderscore: 'forbid',
                        trailingUnderscore: 'forbid',
                    },
                    {
                        selector: 'classProperty',
                        modifiers: ['private'],
                        format: ['camelCase'],
                        leadingUnderscore: 'allow',
                    },
                    {
                        selector: 'classProperty',
                        modifiers: ['protected'],
                        format: ['camelCase'],
                        leadingUnderscore: 'allow',
                    },
                ],
            },
        },
    ],
};

module.exports = config;
