function custom_theme(monaco) {
   const custom_light_rules = [
      { token: "block", foreground: "0000cd", fontStyle: "bold" },
      { token: "mfunc", foreground: "0000ff" },
      { token: "function", foreground: "ff4500" },
      { token: "condition", foreground: "9400d3" },
      { token: "mvar", foreground: "008b8b" },
      { token: "statement", foreground: "0000ff" },
      { token: "spsfunc", foreground: "0000ff", fontStyle: "bold" },
   ];
   const custom_dark_rules = [
      { token: "block", foreground: "48d1cc", fontStyle: "bold" },
      { token: "mfunc", foreground: "569cd6" },
      { token: "identifier", foreground: "cfcfcf" },
      { token: "function", foreground: "569cd6" },
      { token: "condition", foreground: "da70d6" },
      { token: "mvar", foreground: "3cb371" },
      { token: "statement", foreground: "ff8c00" },
      { token: "spsfunc", foreground: "1e90ff", fontStyle: "bold" },
   ];

    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("vs", {
        base: "vs",
        inherit: true,
        rules: custom_light_rules,
        colors: {
            "editor.background": "#FFFFFF",
            "editor.lineHighlightBackground": "#F0F0F0",
        },
    });
    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("hc-light", {
        base: "hc-light",
        inherit: true,
        rules: custom_light_rules,
        colors: {
            "editor.background": "#FFFFFF",
            "editor.lineHighlightBackground": "#F0F0F0",
        },
    });
    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("vs-dark", {
        base: "vs-dark",
        inherit: true,
        rules: custom_dark_rules,
        colors: {
            "editor.background": "#1e1e1e",
            "editor.lineHighlightBackground": "#363636",
        },
    });
    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("hc-black", {
        base: "hc-black",
        inherit: true,
        rules: custom_dark_rules,
        colors: {
            "editor.background": "#1e1e1e",
            "editor.lineHighlightBackground": "#363636",
        },
    });

    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("custom-light", {
        base: "vs",
        inherit: true,
        rules: custom_light_rules,
        colors: {
            "editor.background": "#fcfaed",
            "editor.lineHighlightBackground": "#e8e8e8",
        },
    });
    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("custom-dark", {
        base: "vs-dark",
        inherit: true,
        rules: custom_dark_rules,
        colors: {
            "editor.background": "#1e1e1e",
            "editor.lineHighlightBackground": "#363636",
        },
    });
}

require(['vs/editor/editor.main'], function () {
   custom_theme(monaco);
})

