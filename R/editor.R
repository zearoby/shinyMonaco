#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
editor <- function(
      value,
      enableSpellCheck     = FALSE,
      fontFamily           = "Consolas",
      fontSize             = 16,
      insertSpaces         = TRUE,
      language             = "plaintext",
      lineNumbers          = "on",
      placeholder          = NULL,
      readOnly             = FALSE,
      renderWhitespace     = "boundary",
      rulers               = list(80, 100, 120),
      scrollBeyondLastLine = TRUE,
      showStatusBar        = TRUE,
      tabSize              = 4,
      theme                = "vs",
      wordWrap             = "off",
      automaticLayout      = TRUE,
      ...,
      width                = NULL,
      height               = NULL,
      elementId            = NULL
) {
   if (!missing(value)) value <- paste0(unlist(value), collapse = "\n")
   if (length(fontSize) != 1 || is.na(as.numeric(fontSize)) || fontSize < 1) stop(paste0("`fontSize` must be a positive number"))
   if (length(fontFamily) != 1 || !tolower(fontFamily) %in% tolower(getSystemFontFamilies())) stop(paste0("`fontFamily` does not exist in system fonts as below list:\n", paste0("\t", getSystemFontFamilies(), collapse = ",\n")))
   if (length(language) != 1 || !language %in% getMonacoLanguages()) stop(paste0("`language` does not exist in below list:\n", paste0("\t", getMonacoLanguages(), collapse = ",\n")))
   if (length(theme) != 1 || !theme %in% getMonacoThemes()) stop(paste0("`theme` does not exist in below list:\n", paste0("\t", getMonacoThemes(), collapse = ",\n")))


   # forward options using x
   x = list(
      value = value,
      enableSpellCheck = enableSpellCheck,
      fontFamily = fontFamily,
      fontSize = fontSize,
      insertSpaces = insertSpaces,
      language = language,
      lineNumbers = lineNumbers,
      placeholder = placeholder,
      readOnly = readOnly,
      renderWhitespace = renderWhitespace,
      rulers = rulers,
      scrollBeyondLastLine = scrollBeyondLastLine,
      showStatusBar = showStatusBar,
      tabSize = tabSize,
      wordWrap = wordWrap,
      automaticLayout = automaticLayout,
      ...
   )

   # create widget
   htmlwidgets::createWidget(
      name = 'editor',
      x,
      width = width,
      height = height,
      package = 'shinyMonaco',
      elementId = elementId
   )
}

#' Shiny bindings for editor
#'
#' Output and render functions for using editor within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a editor
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name editor-shiny
#'
#' @export
editorOutput <- function(outputId, width = '100%', height = '400px'){
   htmlwidgets::shinyWidgetOutput(outputId, 'editor', width, height, package = 'shinyMonaco')
}

#' @rdname editor-shiny
#' @export
renderEditor <- function(expr, env = parent.frame(), quoted = FALSE) {
   if (!quoted) { expr <- substitute(expr) } # force quoted
   htmlwidgets::shinyRenderWidget(expr, editorOutput, env, quoted = TRUE)
}
