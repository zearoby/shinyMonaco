function sas_highlight_provider(monaco) {
   monaco.languages.register({ id: "sas" });
   monaco.languages.setLanguageConfiguration("sas",{
      comments: {
         blockComment: ["/*", "*/"]
      },
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
      }]
   });
   // Register a tokens provider for the language
   monaco.languages.setMonarchTokensProvider("sas", {
      ignoreCase:true,
      defaultToken: "identifier",
      statement_clause: ["append", "into", "separated", "base", "ods", "select", "none", "from", "libname", "noprint", "freq", "call", "transpose", "sort", "sql", "var", "id", "options", "notes", "nomprint", "nosource", "array", "attrib", "by", "contained", "delete", "drop", "format", "forward", "informat", "keep", "length", "merge", "output", "put", "rename", "retain", "set", "stop", "vararray", "varlist", "where", "footnote", "footnote1", "footnote2", "footnote3", "footnote4", "footnote5", "footnote6", "footnote7", "footnote8", "footnote9", "footnote10", "title", "title1", "title2", "title3", "title4", "title5", "title6", "title7", "title8", "title9", "title10"],
      builtins_conditionals: ["do", "if", "then", "else", "end", "until", "while", "to"],
      builtins_macro_conditionals: ["%do", "%if", "%then", "%else", "%end", "%until", "%while", "%to"],
      data: ["%macro", "data", "%mend", "run", "proc", "quit"],
      digits: /\b\d+(\.\d+)*\b/,
      tokenizer: {
         root: [
            {
               include: "@comment"
            },
            {
               include: "@string"
            },
            {
               include: "@whitespace"
            },
            [/%sps_(\w+_)+\d+/, "spsfunc"],
            [/%[a-zA-Z_]\w*/, {
               cases: {
                  "@data": { token: "block" },
                  "@builtins_macro_conditionals": { token: "condition" },
                  "@default": "mfunc"
               },
            }],
            [/&+[a-zA-Z_]\w*\.*/, "mvar"],
            [/([a-zA-Z]+)(\()/, ["function", "identifier"]],
            [/[a-zA-Z_]+\d*/, {
               cases: {
                  "@data": { token: "block" },
                  "@builtins_conditionals": { token: "condition" },
                  "@statement_clause": { token: "statement" },
               }
            }],
            [/@digits/, "number"],
         ],
         comment: [
            [/\/\*/, "comment", "@qqcomment"],
            [/\%\*/, "comment", "@qcomment"],
            [/^\s*\*/, "comment", "@qcomment"],
            [/(\;)(\s*\*)/, "comment", "@qcomment"],
         ],
         string: [
            [/"/, "string", "@qqstring"],
            [/'/, "string", "@qstring"],
            [/%(str|nrstr|nrbquote|bquote|quote)\(/, "mfunc", "@mstringfunc"],
         ],
         whitespace: [
            [/%"/, "identifier"],
            [/%'/, "identifier"],
         ],
         qqcomment: [
            [/\*\//, "comment", "@pop"],
            [/./, "comment"]
         ],
         qcomment: [
            [/[^;]+/, "comment"],
            [";", "comment", "@pop"],
         ],
         qstring: [
            [/[^']+/, "string"],
            [/'/, "string", "@pop"]
         ],
         qqstring: [
            [/&+[a-zA-Z_]\w*\.*/, "mvar"],
            [/[^"&]+/, "string"],
            [/"/, "string", "@pop"]
         ],
         mstringfunc: [
            [/\(&+[a-zA-Z_]\w*\.*\)/, "mvar"],
            [/\([^()]*\)/, "string"],
            [/&+[a-zA-Z_]\w*\.*/, "mvar"],
            [/[^)]/, "string"],
            [/\)/, "identifier", "@pop"],
         ]
      },
   });
}

require(['vs/editor/editor.main'], function () {
   sas_highlight_provider(monaco);
})
