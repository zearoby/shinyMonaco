function plaintext_provider(monaco) {
    monaco.languages.register({ id: "plaintext" });
    monaco.languages.setLanguageConfiguration("plaintext",{
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        autoClosingPairs: [{
            open: "{",
            close: "}"
        }, {
            open: "[",
            close: "]"
        }, {
            open: "(",
            close: ")"
        }, {
            open: '"',
            close: '"'
        }, {
            open: "'",
            close: "'"
        }, {
            open: "<",
            close: ">"
        }, {
            open: "`",
            close: "`"
        }],
        surroundingPairs: [{
            open: "{",
            close: "}"
        }, {
            open: "[",
            close: "]"
        }, {
            open: "(",
            close: ")"
        }, {
            open: '"',
            close: '"'
        }, {
            open: "'",
            close: "'"
        }, {
            open: "<",
            close: ">"
        }, {
            open: "`",
            close: "`"
        }]
    });
    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider("plaintext", {
        ignoreCase:true,
        defaultToken: "identifier",
        digits: /\b\d+(\.\d+)*\b/,
        tokenizer: {
            root: [
                {
                    include: "string"
                },
                [/@digits/, "number"],
            ],
            string: [
                [/'/, "string", "@qstring"],
                [/"/, "string", "@qqstring"],
                [/`/, "string", "@bstring"]
            ],
            qstring: [
                [/[^'&]+/, "string"],
                [/'/, "string", "@pop"]
            ],
            qqstring: [
                [/[^"&]+/, "string"],
                [/"/, "string", "@pop"]
            ],
            bstring: [
                [/[^`&]+/, "string"],
                [/`/, "string", "@pop"]
            ]
        },
    });
}

require(['vs/editor/editor.main'], function () {
   plaintext_provider(monaco);
})
