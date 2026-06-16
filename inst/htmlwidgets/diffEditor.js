HTMLWidgets.widget({
   name: 'diffEditor',
   type: 'output',
   factory: function(el, width, height) {
      return {
         renderValue: function(x) {
            require(['vs/editor/editor.main'], function () {
               el.innerHTML = "";

               let diffEditor = null;

               function initDiffEditor() {
                  const editorModelA = monaco.editor.createModel(x.valueA, x.language);
                  const editorModelB = monaco.editor.createModel(x.valueB, x.language);

                  delete x.valueA;
                  delete x.valueB;
                  delete x.language;

                  const editor_setting = {};
                  let unrecognized_arguments = [];

                  for (const key in x) {
                     if (diffEditorOptions.includes(key)) {
                        editor_setting[key] = x[key];
                     }
                     else if (key !== "showStatusBar") {
                        unrecognized_arguments.push(key);
                     }
                  }
                  if (unrecognized_arguments.length > 0) {
                     console.warn(`Unrecognized arguments: ${unrecognized_arguments.join(", ")}.`);
                     console.warn("For unrecognized arguments, please refer to https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor_editor_api.editor.IDiffEditorConstructionOptions.html");
                  }

                  diffEditor = monaco.editor.createDiffEditor(el, editor_setting);

                  diffEditor.setModel({
                     original: editorModelA,
                     modified: editorModelB
                  });
               }


               if (typeof monaco === "undefined") {
                  require(['vs/editor/editor.main'], function () {
                     initDiffEditor();
                  });
               }
               else {
                  initDiffEditor();
               }
               createDiffEditorToolBar(el, diffEditor);
            });
         },

         resize: function(width, height) {
            // TODO: code to re-render the widget with a new size
         }
      };
   }
});
