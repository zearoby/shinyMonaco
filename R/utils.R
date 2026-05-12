# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Check outputId is character and exist in shiny session
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
# Function Arguments:
#' @param outputId
#'    [character]: The id of the table to be manipulated
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns NULL
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   check_output_id
#' @title  Check outputId
#' @rdname check_output_id
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|

check_output_id <- function(outputId) {
   if (!(is.character(outputId) && nchar(trimws(outputId)) > 0)) stop("`outputId` must be a character")
}


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Get system font families
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns List of system font families
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export getSystemFontFamilies
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   getSystemFontFamilies
#' @title  Get system font families
#' @rdname getSystemFontFamilies
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
getSystemFontFamilies <- memoise::memoise(function() {unique(systemfonts::system_fonts()$family)})



# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Gets all of the available \code{modes} available in the installed version
#'    of ace editor. Modes are often the programming or markup language which will
#'    be used in the editor and determine things like syntax highlighting and
#'    code folding.
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns List of all languages in Monaco editor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export getMonacoLanguages
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   getMonacoLanguages
#' @title  Get all ace modes
#' @rdname getMonacoLanguages
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
getMonacoLanguages <- memoise::memoise(function() {
   list(
      "plaintext", "json", "abap", "apex", "azcli", "bat", "bicep", "cameligo", "clojure", "coffeescript",
      "c", "cpp", "csharp", "csp", "css", "cypher", "dart", "dockerfile", "ecl", "elixir", "flow9", "fsharp",
      "freemarker2", "go", "graphql", "handlebars", "hcl", "html", "ini", "java", "javascript", "julia",
      "kotlin", "less", "lexon", "lua", "liquid", "m3", "markdown", "mdx", "mips", "msdax", "mysql",
      "objective-c", "pascal", "pascaligo", "perl", "pgsql", "php", "pla", "postiats", "powerquery",
      "powershell", "proto", "pug", "python", "qsharp", "r", "razor", "redis", "redshift", "restructuredtext",
      "ruby", "rust", "sb", "scala", "scheme", "scss", "shell", "sol", "aes", "sparql", "sql", "st", "swift",
      "systemverilog", "verilog", "tcl", "twig", "typescript", "typespec", "vb", "wgsl", "xml", "yaml"
   )
})


# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
#' @description
#'    Gets all of the available \code{themes} available in the installed version
#'    of monaco editor. Themes determine the styling and colors used in the editor.
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @returns List of all themes in Monaco editor
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @export getMonacoThemes
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|
#' @name   getMonacoThemes
#' @title  Get all monaco themes
#' @rdname getMonacoThemes
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|
getMonacoThemes <- memoise::memoise(function() {
   list("vs", "vs-dark", "hc-black", "hc-light")
})
