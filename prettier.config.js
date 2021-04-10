const config = {
    trailingComma: 'none',
    tabWidth: 4,
    printWidth: 80,
    singleQuote: true,
    endOfLine: 'lf',
    quoteProps: 'as-needed',
    bracketSpacing: true,
    overrides: [
        {
            files: '*.yml',
            options: {
                tabWidth: 2,
                printWidth: 120
            }
        },
        {
            files: '*.json',
            options: {
                tabWidth: 2,
                printWidth: 120
            }
        },
        {
            files: '*.html',
            options: {
                printWidth: 120
            }
        }
    ]
};

module.exports = config;

