HTMLWidgets.widget({
   name: 'editor',
   type: 'output',
   factory: function(el, width, height) {
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
                  el.appendChild(createEditorStatusBar(editor));
               }
               editor.enableSpellCheck = x.enableSpellCheck;
               editor.showSaveMenu     = x.showSaveMenu;
               editor.showReloadMenu   = x.showReloadMenu;
               addActions(editor);
               initOnDidChangeEvent(editor);
               editor.spellChecker = new editorSpellChecker(editor);
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


const addActions = function(editor) {
   if (editor.showSaveMenu) {
      editor.addAction({
         id: "save",
         label: "Save",
         keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
         contextMenuGroupId: "navigation",
         contextMenuOrder: 1,
         run: function () {
            if (HTMLWidgets.shinyMode) {
               Shiny.setInputValue(editor.id + "_on_save", editor.getValue(), {priority: "event"});
            }
         }
      })
   };
   if (editor.showReloadMenu) {
      editor.addAction({
         id: "reload",
         label: "Reload",
         keybindings: [monaco.KeyCode.F5],
         contextMenuGroupId: "navigation",
         contextMenuOrder: 2,
         run: function () {
            if (HTMLWidgets.shinyMode) {
               Shiny.setInputValue(editor.id + "_on_reload", true, {priority: "event"});
            }
         }
      })
   };
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
      contextMenuOrder: 3,
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


const createEditorStatusBar = function(editor) {
   const status_bar_div = document.createElement('div');
   status_bar_div.className = "monaco-status-bar";

   const cursor_pos_div = document.createElement('span');
   cursor_pos_div.className = "monaco-status-button";
   cursor_pos_div.textContent = "Ln: 0, Col: 0";
   editor.onDidChangeCursorPosition((event) => {
      const [row, column] = Object.values(event.position);
      cursor_pos_div.textContent = `Ln: ${row - 1}, Col: ${column - 1}`;
   });
   cursor_pos_div.addEventListener('click', function() {
      editor.focus();
      editor.trigger(null, "editor.action.gotoLine", null);
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

   const spacer = document.createElement('div');
   spacer.style.flex = "1";

   const words_div = document.createElement('span');
   const lines_div = document.createElement('span');
   lines_div.textContent = `Lines: ${editor.getValue().split(/\r\n|\n|\r/)?.length}`;
   words_div.textContent = `Words: ${editor.getValue().match(/\w+/g)?.length}`;
   editor.onDidChangeModelContent((event) => {
      const text = editor.getValue();
      lines_div.textContent = `Lines: ${text.split(/\r\n|\n|\r/)?.length}`;
      words_div.textContent = `Words: ${text.match(/\w+/g)?.length}`;
   })

   const language_div = document.createElement('span');
   language_div.textContent = editor.getModel().getLanguageId();
   editor.getModel().onDidChangeLanguage(function(event) {
      language_div.textContent = editor.getModel().getLanguageId();
   });

   const indent_size_div = document.createElement('span');
   indent_size_div.className = "monaco-status-button";
   indent_size_div.textContent = `Spaces: ${editor.getModel().getOptions().indentSize}`;
   indent_size_div.addEventListener('click', function() {
      editor.focus();
      editor.trigger(null, "editor.action.indentUsingSpaces", null);
   });
   editor.getModel().onDidChangeOptions(function(event) {
      indent_size_div.textContent = `Spaces: ${editor.getModel().getOptions().indentSize}`;
   });

   status_bar_div.append(cursor_pos_div, selection_div, spacer, words_div, lines_div, language_div, indent_size_div);

   return status_bar_div;
}

