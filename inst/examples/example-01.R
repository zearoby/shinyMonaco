library(shiny)

ui <- shiny::fluidPage(
   shiny::fluidRow(
      shinyMonaco::editorOutput("editor", height = "100vh"),
      shinyMonaco::editorOutput("editor2", height = "100vh")
   )
)

server <- function(input, output, session) {
   output$editor <- shinyMonaco::renderEditor({
      shinyMonaco::editor("asd")
   })
   output$editor2 <- shinyMonaco::renderEditor({
      shinyMonaco::editor("zxc")
   })
}

shinyApp(ui, server)
