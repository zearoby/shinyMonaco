library(shiny)
library(shinyjs)
library(bslib)

ui <- bslib::page_fillable(
   shinyjs::useShinyjs(),
   padding = 5,
   gap = 5,
   bslib::accordion(
      shiny::actionButton("b1", "Spell", title = "Toggle spell check", class = "btn-sm btn-primary"),
      shiny::actionButton("b2", "TabSize", title = "Update tab size to 3 spaces", class = "btn-sm btn-primary"),
      shiny::actionButton("b3", "Options", title = "Update tab size and wordWrap", class = "btn-sm btn-primary"),
      shiny::actionButton("b4", "Theme", title = "Change theme", class = "btn-sm btn-primary"),
      shiny::actionButton("b5", "Language", title = "Change language", class = "btn-sm btn-primary"),
      shiny::actionButton("b6", "Set Value", title = "Set specified value to editor", class = "btn-sm btn-primary"),
      shiny::actionButton("b7", "Get Value", title = "Get current value to display", class = "btn-sm btn-primary"),
      shiny::actionButton("b8", "Cursor Position", title = "Get current cursor position to display", class = "btn-sm btn-primary"),
      shiny::actionButton("b9", "Selection Range", title = "Get selection range to display", class = "btn-sm btn-primary"),
      shiny::actionButton("b10", "Selected Text", title = "Get selected text to display", class = "btn-sm btn-primary"),
      shiny::actionButton("b11", "Set Focus", title = "Set focus to editor", class = "btn-sm btn-primary")
   ),
   shiny::div(
      style = "display: flex;",
      shinyMonaco::editorOutput("editor1", width = "50%"),
      shinyMonaco::editorOutput("editor2", width = "50%")
   ),
   shinyMonaco::diffEditorOutput("diffEditor")
)

server <- function(input, output, session) {
   text1 <- readLines("./example-01.R")
   text2 <- sub("shinyMonaco", "ShinyMonaco", text1)

   output$editor1 <- shinyMonaco::renderEditor({
      shinyMonaco::editor(text1, language = "sas", theme = "light", showStatusBar = TRUE)
   })
   output$editor2 <- shinyMonaco::renderEditor({
      shinyMonaco::editor(text2, language = "plaintext", theme = "light", showStatusBar = TRUE)
   })
   output$diffEditor <- shinyMonaco::renderdiffEditor({
      shinyMonaco::diffEditor(text1, text2, language = "r")
   })

   editor_id <- "editor1"

   spell_check <- shiny::reactiveVal(TRUE)
   shiny::observeEvent(input$b1, {
      shinyMonaco::setEnableSpellCheck(editor_id, spell_check())
      spell_check(!spell_check())
   })
   tab_size <- shiny::reactiveVal(4)
   shiny::observeEvent(input$b2, {
      shinyMonaco::updateOption(editor_id, name = "indentSize", value = tab_size())
      tab_size(ifelse(tab_size() == 3, 4, 3))
   })
   word_wrap <- shiny::reactiveVal(TRUE)
   shiny::observeEvent(input$b3, {
      shinyMonaco::updateOptions(editor_id, list(indentSize = 8, wordWrap = word_wrap()))
      word_wrap(!word_wrap())
   })

   theme <- shiny::reactiveVal("vs-dark")
   shiny::observeEvent(input$b4, {
      shinyMonaco::setTheme(theme())
      theme(ifelse(theme() == "vs", "vs-dark", "vs"))
   })

   language <- shiny::reactiveVal("sas")
   shiny::observeEvent(input$b5, {
      shinyMonaco::setLanguage(editor_id, language())
      language(ifelse(language() == "r", "sas", "r"))
   })
   shiny::observeEvent(input$b6, {
      shinyMonaco::setValue(editor_id, "Test Value")
   })
   shiny::observeEvent(input$b7, {
      text <- (shinyMonaco::getValue(editor_id))
      shiny::showModal(shiny::modalDialog(
         title = "Display Value",
         shiny::code(text),
         size = "xl",
         easyClose = TRUE
      ))
   })
   shiny::observeEvent(input$b8, {
      text <- (shinyMonaco::getCursorPosition(editor_id))
      text <- paste(names(text), text, sep = ": ", collapse = "\n")
      shiny::showModal(shiny::modalDialog(
         title = "Display Cursor Position",
         shiny::code(text),
         size = "l",
         easyClose = TRUE
      ))
   })
   shiny::observeEvent(input$b9, {
      text <- (shinyMonaco::getSelectionRange(editor_id))
      if (is.null(text)) {
         text <- "No Selection"
      }
      else {
         text <- paste(names(text), text, sep = ": ", collapse = "\n")
      }
      shiny::showModal(shiny::modalDialog(
         title = "Display Selection Range",
         shiny::code(text),
         size = "l",
         easyClose = TRUE
      ))
   })
   shiny::observeEvent(input$b10, {
      text <- (shinyMonaco::getSelectedText(editor_id))
      shiny::showModal(shiny::modalDialog(
         title = "Display Selected Text",
         shiny::code(text),
         size = "l",
         easyClose = TRUE
      ))
   })
   shiny::observeEvent(shinyMonaco::onEditorReady(editor_id), {
      shiny::showNotification("Editor is ready")
   })
   shiny::observeEvent(input$b11, {
      shinyMonaco::setFocus(editor_id)
   })
}

shinyApp(ui, server)
