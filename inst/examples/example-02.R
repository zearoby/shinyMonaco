library(shiny)
library(shinyjs)
library(bslib)

ui <- bslib::page_fillable(
   shinyjs::useShinyjs(),
   padding = 5,
   shinyMonaco::diffEditorOutput("editor")
)

server <- function(input, output, session) {
   editor_id <- "editor"
   output[[editor_id]] <- shinyMonaco::renderdiffEditor({
      shinyMonaco::diffEditor(readLines("./example-01.R"), readLines("./example-02.R"), language = "r")
   })
}

shinyApp(ui, server)
