# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Create diffEditor for exist editors in an exist widget
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param editorAId
#'    [character]: The element id of the first editor
#' @param editorBId
#'    [character]: The element id of the second editor
#' @param elementId
#'    [character]: The element id of the exist widget to show diffEditor
#' @param toolBar
#'    [logical]: Show tool bar in diffEditor
#' @param session
#'    [environment]: The Shiny session object for the diffEditor (from the server function of the Shiny app)
#' @param sessionA
#'    [environment]: The Shiny session object for the first editor (from the server function of the Shiny app)
#' @param sessionB
#'    [environment]: The Shiny session object for the second editor (from the server function of the Shiny app)
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns No return value, called for side effects
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'    shinyMonaco::createDiffEditor(editorAId = "editor1", editorBId = "editor2")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export createDiffEditor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   createDiffEditor
#' @title  Create diffEditor
#' @rdname createDiffEditor
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

createDiffEditor <- function(editorAId, editorBId, elementId, toolBar = TRUE, session = shiny::getDefaultReactiveDomain(), sessionA = shiny::getDefaultReactiveDomain(), sessionB = shiny::getDefaultReactiveDomain()) {
   check_output_id(editorAId)
   check_output_id(editorBId)
   removeDiffEditor(elementId, session)
   shinyjs::runjs(
      paste0(
         "const editorA = getEditor('", sessionA$ns(editorAId), "');",
         "const editorB = getEditor('", sessionB$ns(editorBId), "');",
         "const toolBarFlag = ", tolower(toolBar), ";",
         "const el = document.getElementById('", session$ns(elementId), "');",
         "el.innerHTML = '';",
         "const diffEditor = monaco.editor.createDiffEditor(el, {",
         "   originalEditable: true,",
         "   ignoreTrimWhitespace: false,",
         "   renderSideBySide: true,",
         "   automaticLayout: true",
         "});",
         "diffEditor.id = el.id;",
         "diffEditor.setModel({",
         "   original: editorA.getModel(),",
         "   modified: editorB.getModel()",
         "});",
         "if (toolBarFlag) {",
         "   createDiffEditorToolBar(el, diffEditor)",
         "}"
      )
   )
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Remove monaco diff view for exist editors
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param elementId
#'    [character]: The element id of the diffEditor
#' @param session
#'    [environment]: The Shiny session object for the diffEditor (from the server function of the Shiny app)
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns No return value, called for side effects
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'    shinyMonaco::removeDiffEditor(elementId = "editor1")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export removeDiffEditor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   removeDiffEditor
#' @title  Remove diffEditor
#' @rdname removeDiffEditor
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

removeDiffEditor <- function(elementId, session = shiny::getDefaultReactiveDomain()) {
   shinyjs::runjs(
      paste0(
         "const elementId = '", session$ns(elementId), "';",
         "for (const editor of monaco.editor.getDiffEditors()) {",
         "   if (editor.id && editor.id === elementId) {",
         "      editor.setModel(null);",
         "      editor.dispose();",
         "   }",
         "};",
         "const diff_editor = document.getElementById(elementId);",
         "diff_editor.innerHTML = '';"
      )
   )
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Enable or disable spell check
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param enable
#'    [logical]: Set spell check TRUE or FALSE
#' @param session
#'    [environment]: The Shiny session object for the editor (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns No return value, called for side effects
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::setEnableSpellCheck(outputId = "editor", enable = TRUE)
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export setEnableSpellCheck
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   setEnableSpellCheck
#' @title  Enable or disable spell check
#' @rdname setEnableSpellCheck
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

setEnableSpellCheck <- function(outputId, enable = TRUE, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   if (length(enable) != 1 || !enable %in% c(TRUE, FALSE)) stop("`enable` must be TRUE or FALSE")
   shinyjs::runjs(
      paste0(
         "const editor = getEditor('", session$ns(outputId), "');",
         "if (", tolower(enable), " == true) {",
         "   editor.spellChecker.enableSpellCheck();",
         "}",
         "else {",
         "   editor.spellChecker.disableSpellCheck();",
         "}"
      )
   )
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Update an option to monacoEditor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param name
#'    [character]: Option name. Refer to \url{https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor_editor_api.editor.IEditorOptions.html}
#' @param value
#'    [character], [integer], [logical]: Option value. Refer to \url{https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor_editor_api.editor.IEditorOptions.html}
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns No return value, called for side effects
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::updateOption(outputId = "editor", name = "tabSize", value = 3)
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export updateOption
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   updateOption
#' @title  Update an option to editor
#' @rdname updateOption
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

updateOption <- function(outputId, name, value, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   shinyjs::runjs(
      paste0(
         "const editor = getEditor('", session$ns(outputId), "');",
         "const option = {", jsonlite::toJSON(name, auto_unbox = TRUE),":", jsonlite::toJSON(value, auto_unbox = TRUE), "};",
         "editor.updateOptions(option);",
         "editor.getModel().updateOptions(option);"
      )
   )
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Update options to monacoEditor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param options
#'    [list]: editor options. Refer to \url{https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor_editor_api.editor.IEditorOptions.html}
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns No return value, called for side effects
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::updateOptions(outputId = "editor", options = list())
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export updateOptions
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   updateOptions
#' @title  Update options to monacoEditor
#' @rdname updateOptions
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

updateOptions <- function(outputId, options, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   if (!is.list(options)) stop("`options` must be list")
   shinyjs::runjs(
      paste0(
         "const editor = getEditor('", session$ns(outputId), "');",
         "const option = ", jsonlite::toJSON(options, auto_unbox = TRUE), ";",
         "editor.updateOptions(option);",
         "editor.getModel().updateOptions(option);"
      )
   )
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Set a new theme for the editor. theme should exist, like `vs-dark`
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param theme
#'    [character]: The theme of the editor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns No return value, called for side effects
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::setTheme(theme = "vs")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export setTheme
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   setTheme
#' @title  Set new theme
#' @rdname setTheme
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

setTheme <- function(theme) {
   theme <- tolower(theme)
   if (length(theme) != 1 || !theme %in% getMonacoThemes()) stop(paste0("`theme` does not exist in below list:\n", paste0("\t", getMonacoThemes(), collapse = ",\n")))
   shinyjs::runjs(
      paste0(
         "const theme = '", theme, "';",
         "monaco.editor.setTheme(theme);",
         "if (theme.match(/dark|black/i)) {",
         "   document.documentElement.style.setProperty('--monaco-status-bar-color', 'white');",
         "   document.documentElement.style.setProperty('--monaco-status-bar-bg', 'black');",
         "}",
         "else {",
         "   document.documentElement.style.setProperty('--monaco-status-bar-color', 'black');",
         "   document.documentElement.style.setProperty('--monaco-status-bar-bg', 'white');",
         "}"
      )
   )
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Set language to editor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param language
#'    [character]: The highlight of code
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns No return value, called for side effects
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::setLanguage(outputId = "editor", language = "text")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export setLanguage
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   setLanguage
#' @title  Set language
#' @rdname setLanguage
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

setLanguage <- function(outputId, language, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   if (length(language) != 1 || !language %in% getMonacoLanguages()) stop(paste0("`language` does not exist in below list:\n", paste0("\t", getMonacoLanguages(), collapse = ",\n")))
   shinyjs::runjs(
      paste0(
         "const editor = getEditor('", session$ns(outputId), "');",
         "monaco.editor.setModelLanguage(editor.getModel(), '", language, "');"
      )
   )
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Set focus to editor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns No return value, called for side effects
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::setFocus(outputId = "editor")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export setFocus
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   setFocus
#' @title  Set focus
#' @rdname setFocus
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

setFocus <- function(outputId, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   shinyjs::runjs(
      paste0(
         "const editor = getEditor('", session$ns(outputId), "');",
         "editor.focus();"
      )
   )
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Replace all the lines in the current Document with the value of text.
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param value
#'    [character]: The text of the editor
#' @param clearChangedHistory
#'    [logical]: Clear undo/redo history
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns No return value, called for side effects
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::setValue(outputId = "editor", value = "text")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export setValue
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   setValue
#' @title  Replace text with new text
#' @rdname setValue
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

setValue <- function(outputId, value, clearChangedHistory = FALSE, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   if (!missing(value)) value <- paste0(unlist(value), collapse = "\n")
   shinyjs::runjs(
      sprintf(
         paste0(
            "const value = %s;",
            "const editor = getEditor(%s);",
            ifelse(
               clearChangedHistory,
               paste0("editor.setValue(value);"),
               paste0(
                  "editor.getModel().pushEditOperations([], [{",
                  "   range: editor.getModel().getFullModelRange(),",
                  "   text: value,",
                  "}], () => null);"
               )
            )
         ),
         jsonlite::toJSON(value, auto_unbox = TRUE),
         jsonlite::toJSON(session$ns(outputId), auto_unbox = TRUE)
      )
   )
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Get value in monacoEditor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns Character of editor text
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::getValue(outputId = "editor")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export getValue
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   getValue
#' @title  Get value in monacoEditor
#' @rdname getValue
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

getValue <- function(outputId, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   data <- session$input[[outputId]]
   return(data)
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Get cursor position in monacoEditor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns List of cursor position
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::getCursorPosition(outputId = "editor")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export getCursorPosition
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   getCursorPosition
#' @title  Get cursor position in monacoEditor
#' @rdname getCursorPosition
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

getCursorPosition <- function(outputId, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   data <- session$input[[paste0(outputId, "_cursor_changed")]]
   if (!is.null(data)) {
      data <- jsonlite::fromJSON(data)
   }
   return(data)
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Get selection range in monacoEditor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns List of selection range
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::getSelectionRange(outputId = "editor")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export getSelectionRange
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   getSelectionRange
#' @title  Get selection range in monacoEditor
#' @rdname getSelectionRange
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

getSelectionRange <- function(outputId, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   data <- session$input[[paste0(outputId, "_selection_changed")]]
   if (!is.null(data)) {
      data <- jsonlite::fromJSON(data)
   }
   return(data)
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Get selected text in monacoEditor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns Character of selected text
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::getSelectedText(outputId = "editor")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export getSelectedText
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   getSelectedText
#' @title  Get selected text in monacoEditor
#' @rdname getSelectedText
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

getSelectedText <- function(outputId, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   data <- session$input[[paste0(outputId, "_selected_text")]]
   return(data)
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Fires upon monacoEditor initialisation
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the editor
#' @param session
#'    [environment]: The Shiny session object (from the server function of the Shiny app).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns `TRUE`
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @examples
#' if(interactive()){
#'     shinyMonaco::onEditorReady(outputId = "editor")
#' }
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export onEditorReady
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   onEditorReady
#' @title  Fires upon monacoEditor initialisation
#' @rdname onEditorReady
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

onEditorReady <- function(outputId, session = shiny::getDefaultReactiveDomain()) {
   check_output_id(outputId)
   data <- session$input[[paste0(outputId, "_ready")]]
   return(data)
}
