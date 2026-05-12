require.config({paths: {'vs': 'monaco-editor-0.55.1/lib/package/min/vs'}});



HTMLWidgets.widget({

   name: 'editor',

   type: 'output',

   factory: function(el, width, height) {

      // TODO: define shared variables for this instance

      return {
         renderValue: function(x) {
            require(['vs/editor/editor.main'], function () {
               monaco.editor.getEditors().forEach(
                  editor => {
                     if (editor.id && editor.id === el.id) editor.dispose();
                  }
               );
               el.innerHTML = '';
               const editor = monaco.editor.create(el, getEditorSetting(x));
               editor.id = el.id;

               if (x.showStatusBar == true) {
                  el.appendChild(createStatusBar(editor));
               }
               if (x.enableSpellCheck == true) {
                  editor.enableSpellCheck = x.enableSpellCheck;
               }
               addAction(editor);
               initOnDidChangeEvent(editor);
               editor.spellChecker = new MonacoSpellChecker(editor);
               editor.focus();
               if (HTMLWidgets.shinyMode) {
                  Shiny.setInputValue(editor.id, editor.getValue(), {priority: "event"});
                  Shiny.setInputValue(editor.id + "_cursor_changed", JSON.stringify({row: 0, column: 0}), {priority: "event"});
                  Shiny.setInputValue(editor.id + "_selected_text", "", {priority: "event"});
                  Shiny.setInputValue(editor.id + "_ready", true, {priority: "event"});
               }
            });
         },

         resize: function(width, height) {
            // TODO: code to re-render the widget with a new size
         }

      };
   }
});


const getEditorSetting = function(x) {
   const editor_setting = {};
   let unrecognized_arguments = [];

   for (const key in x) {
      if (monacoEditorOptions.includes(key)) {
         editor_setting[key] = x[key];
      }
      else if (!["enableSpellCheck", "showStatusBar"].includes(key)) {
         unrecognized_arguments.push(key);
      }
   }
   if (unrecognized_arguments.length > 0) {
      console.warn(`Unrecognized arguments: ${unrecognized_arguments.join(", ")}.`);
      console.warn("For unrecognized arguments, please refer to https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor_editor_api.editor.IStandaloneEditorConstructionOptions.html");
   }
   return editor_setting;
}

const getMonacoEditor = function(id) {
   for (const editor of monaco.editor.getEditors()) {
      if (editor.id && editor.id === id) {
         return editor;
      }
   };
   console.warn(`The monaco editor "${id}" is not found.`);
   return null;
}


const initOnDidChangeEvent = function(editor) {
   if (HTMLWidgets.shinyMode) {
      editor.onDidChangeModelContent((event) => {
         Shiny.setInputValue(
            editor.id, editor.getValue(), {priority: "event"}
         );
      })
      editor.onDidChangeCursorPosition((event) => {
         const [row, column] = Object.values(event.position);
         Shiny.setInputValue(
            editor.id + "_cursor_changed", JSON.stringify({row: row - 1, column: column - 1}), {priority: "event"}
         );
      });
      editor.onDidChangeCursorSelection((event) => {
         const selection = event.selection;
         Shiny.setInputValue(
            editor.id + "_selection_changed", JSON.stringify(selection), {priority: "event"}
         );
         const selectedText = editor.getModel().getValueInRange(selection);
         Shiny.setInputValue(
            editor.id + "_selected_text", selectedText, {priority: "event"}
         );
      });
   }
}


const addAction = function(editor) {
   editor.addAction({
      id: "transform_case",
      label: "Transform Case",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
      run: function () {
         const text = editor.getModel().getValueInRange(editor.getSelection());
         if (text.length > 0) {
            if (text.toUpperCase() === text) {
               editor.getAction("editor.action.transformToLowercase").run();
            } else {
               editor.getAction("editor.action.transformToUppercase").run();
            }
         }
      }
   });
   editor.addAction({
      id: "toggle_column_selection",
      label: "Toggle Column Selection",
      run: function () {
         editor.updateOptions({
            columnSelection: !editor.getOption(
               monaco.editor.EditorOption.columnSelection
            )
         });
      }
   });
   editor.addAction({
      id: "toggle_word_wrap",
      label: "Toggle Word Wrap",
      run: function () {
         if (editor.getOption(monaco.editor.EditorOption.wordWrap) ==="on") {
            editor.updateOptions({ wordWrap: "off" });
         } else {
            editor.updateOptions({ wordWrap: "on" });
         }
      }
   });
   editor.addAction({
      id: "scroll_beyond_last_line",
      label: "Toggle Scroll Beyond Last Line",
      run: function () {
         editor.updateOptions({
            scrollBeyondLastLine: !editor.getOption(monaco.editor.EditorOption.scrollBeyondLastLine)
         });
      }
   });
   editor.addAction({
      id: "minimap",
      label: "Toggle Mini-map",
      run: function () {
         editor.updateOptions({
            minimap: {enabled: !editor.getOption(monaco.editor.EditorOption.minimap).enabled}
         });
      }
   });
   editor.addAction({
      id: "spell_check",
      label: "Toggle Spell Check",
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE],
      run: function () {
         if (editor.enableSpellCheck) {
            editor.spellChecker.disableSpellCheck();
         }
         else {
            editor.spellChecker.enableSpellCheck();
         }
      }
   });
}


createStatusBar = function(editor) {
   const status_bar_div = document.createElement('div');
   status_bar_div.className = "monaco-editor-status-bar";

   const cursor_pos_div = document.createElement('span');
   cursor_pos_div.textContent = "Ln: 0, Col: 0";
   editor.onDidChangeCursorPosition((event) => {
      const [row, column] = Object.values(event.position);
      cursor_pos_div.textContent = `Ln: ${row - 1}, Col: ${column - 1}`;
   });

   const selection_div = document.createElement('span');
   editor.onDidChangeCursorSelection((event) => {
      const selection = event.selection;
      const selectedText = editor.getModel().getValueInRange(selection);
      if (selectedText.length > 0) {
         selection_div.textContent = `Sel: ${selectedText.length}/${selectedText.split(/\r\n|\r|\n/).length}`;
      }
      else {
         selection_div.textContent = null;
      }
   });

   const words_div = document.createElement('span');
   const lines_div = document.createElement('span');
   lines_div.textContent = `Lines: ${editor.getValue().split(/\r\n|\n|\r/)?.length}`;
   words_div.textContent = `Words: ${editor.getValue().match(/\w+/g)?.length}`;
   editor.onDidChangeModelContent((event) => {
      const text = editor.getValue();
      lines_div.textContent = `Lines: ${text.split(/\r\n|\n|\r/)?.length}`;
      words_div.textContent = `Words: ${text.match(/\w+/g)?.length}`;
   })

   const spacer = document.createElement('div');
   spacer.style.flex = "1";

   const setting_div = document.createElement('button');
   setting_div.textContent = "Setting";
   setting_div.classList.add("status_btn");
   setting_div.title = "Not Available at Present";


   status_bar_div.appendChild(cursor_pos_div);
   status_bar_div.appendChild(selection_div);
   status_bar_div.appendChild(spacer);
   status_bar_div.appendChild(words_div);
   status_bar_div.appendChild(lines_div);
   // status_bar_div.appendChild(setting_div);

   return status_bar_div;
}


const monacoEditorOptions = [
   "acceptSuggestionOnCommitCharacter",
   "acceptSuggestionOnEnter",
   "accessibilityHelpUrl",
   "accessibilityPageSize",
   "accessibilitySupport",
   "allowOverflow",
   "allowVariableFonts",
   "allowVariableFontsInAccessibilityMode",
   "allowVariableLineHeights",
   "ariaContainerElement",
   "ariaLabel",
   "ariaRequired",
   "autoClosingBrackets",
   "autoClosingComments",
   "autoClosingDelete",
   "autoClosingOvertype",
   "autoClosingQuotes",
   "autoDetectHighContrast",
   "autoIndent",
   "autoIndentOnPaste",
   "autoIndentOnPasteWithinString",
   "autoSurround",
   "automaticLayout",
   "bracketPairColorization",
   "codeActionsOnSaveTimeout",
   "codeLens",
   "codeLensFontFamily",
   "codeLensFontSize",
   "colorDecorators",
   "colorDecoratorsActivatedOn",
   "colorDecoratorsLimit",
   "columnSelection",
   "comments",
   "contextmenu",
   "copyWithSyntaxHighlighting",
   "cursorBlinking",
   "cursorHeight",
   "cursorSmoothCaretAnimation",
   "cursorStyle",
   "cursorSurroundingLines",
   "cursorSurroundingLinesStyle",
   "cursorWidth",
   "defaultColorDecorators",
   "definitionLinkOpensInPeek",
   "detectIndentation",
   "dimension",
   "disableLayerHinting",
   "disableMonospaceOptimizations",
   "domReadOnly",
   "dragAndDrop",
   "dropIntoEditor",
   "editContext",
   "emptySelectionClipboard",
   "experimentalGpuAcceleration",
   "experimentalWhitespaceRendering",
   "extraEditorClassName",
   "fastScrollSensitivity",
   "find",
   "fixedOverflowWidgets",
   "folding",
   "foldingHighlight",
   "foldingImportsByDefault",
   "foldingMaximumRegions",
   "foldingStrategy",
   "fontFamily",
   "fontLigatures",
   "fontSize",
   "fontVariations",
   "fontWeight",
   "formatOnPaste",
   "formatOnType",
   "glyphMargin",
   "gotoLocation",
   "guides",
   "hideCursorInOverviewRuler",
   "hover",
   "inDiffEditor",
   "inertialScroll",
   "inlayHints",
   "inlineCompletionsAccessibilityVerbose",
   "inlineSuggest",
   "insertSpaces",
   "language",
   "largeFileOptimizations",
   "letterSpacing",
   "lightbulb",
   "lineDecorationsWidth",
   "lineHeight",
   "lineNumbers",
   "lineNumbersMinChars",
   "linkedEditing",
   "links",
   "matchBrackets",
   "matchOnWordStartOnly",
   "maxTokenizationLineLength",
   "minimap",
   "model",
   "mouseMiddleClickAction",
   "mouseStyle",
   "mouseWheelScrollSensitivity",
   "mouseWheelZoom",
   "multiCursorLimit",
   "multiCursorMergeOverlapping",
   "multiCursorModifier",
   "multiCursorPaste",
   "occurrencesHighlight",
   "occurrencesHighlightDelay",
   "overflowWidgetsDomNode",
   "overtypeCursorStyle",
   "overtypeOnPaste",
   "overviewRulerBorder",
   "overviewRulerLanes",
   "padding",
   "parameterHints",
   "pasteAs",
   "peekWidgetDefaultFocus",
   "placeholder",
   "quickSuggestions",
   "quickSuggestionsDelay",
   "readOnly",
   "readOnlyMessage",
   "renameOnType",
   "renderControlCharacters",
   "renderFinalNewline",
   "renderLineHighlight",
   "renderLineHighlightOnlyWhenFocus",
   "renderRichScreenReaderContent",
   "renderValidationDecorations",
   "renderWhitespace",
   "revealHorizontalRightPadding",
   "roundedSelection",
   "rulers",
   "screenReaderAnnounceInlineSuggestion",
   "scrollBeyondLastColumn",
   "scrollBeyondLastLine",
   "scrollOnMiddleClick",
   "scrollPredominantAxis",
   "scrollbar",
   "selectOnLineNumbers",
   "selectionClipboard",
   "selectionHighlight",
   "selectionHighlightMaxLength",
   "selectionHighlightMultiline",
   "semanticHighlighting.enabled",
   "showDeprecated",
   "showFoldingControls",
   "showUnused",
   "smartSelect",
   "smoothScrolling",
   "snippetSuggestions",
   "stablePeek",
   "stickyScroll",
   "stickyTabStops",
   "stopRenderingLineAfter",
   "suggest",
   "suggestFontSize",
   "suggestLineHeight",
   "suggestOnTriggerCharacters",
   "suggestSelection",
   "tabCompletion",
   "tabFocusMode",
   "tabIndex",
   "tabSize",
   "theme",
   "trimAutoWhitespace",
   "trimWhitespaceOnDelete",
   "unfoldOnClickAfterEndOfLine",
   "unicodeHighlight",
   "unusualLineTerminators",
   "useShadowDOM",
   "useTabStops",
   "value",
   "wordBasedSuggestions",
   "wordBasedSuggestionsOnlySameLanguage",
   "wordBreak",
   "wordSegmenterLocales",
   "wordSeparators",
   "wordWrap",
   "wordWrapBreakAfterCharacters",
   "wordWrapBreakBeforeCharacters",
   "wordWrapColumn",
   "wordWrapOverride1",
   "wordWrapOverride2",
   "wrapOnEscapedLineFeeds",
   "wrappingIndent",
   "wrappingStrategy"
]
