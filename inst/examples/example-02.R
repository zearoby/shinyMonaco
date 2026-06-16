library(shiny)
library(shinyjs)
library(bslib)

ui <- bslib::page_fillable(
   shinyjs::useShinyjs(),
   padding = 5,
   gap = 5,
   bslib::accordion(
      shiny::actionButton("b1", "Create Diff View", class = "btn-sm btn-primary"),
      shiny::actionButton("b2", "Remove Diff View", class = "btn-sm btn-primary")
   ),
   shiny::div(
      style = "display: flex;",
      shinyMonaco::editorOutput("editor1", width = "50%"),
      shinyMonaco::editorOutput("editor2", width = "50%")
   ),
   shiny::div(id = "diffEditor", "Create Diff Editor Here!", style = "flex: 1;")
)

server <- function(input, output, session) {
   text1 <- readLines("./example-01.R")
   text2 <- sub("shinyMonaco", "ShinyMonaco", text1)

   output$editor1 <- shinyMonaco::renderEditor({
      shinyMonaco::editor(text1, language = "r", showStatusBar = TRUE)
   })
   output$editor2 <- shinyMonaco::renderEditor({
      shinyMonaco::editor(text2, language = "r", showStatusBar = TRUE)
   })

   shiny::observeEvent(input$b1, {
      shinyMonaco::createDiffView("editor1", "editor2", "diffEditor")
   })
   shiny::observeEvent(input$b2, {
      shinyMonaco::removeDiffView("diffEditor")
   })
}

shinyApp(ui, server)
