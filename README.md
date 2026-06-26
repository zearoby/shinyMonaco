# shinyMonaco

The `shinyMonaco` package enables Shiny application developers to use the [monaco editor](https://github.com/microsoft/monaco-editor) in their applications.

- The version of `monaco editor` is `v0.55.1`
- Features:

##### -\> Text Comparison

##### -\> Spell Checking

##### -\> Extra SAS Code Highlight Mode

## Installing

Install this package:

``` r
install.packages("shinyMonaco")
```

Or install this package straight from GitHub via `pak::pak()`:

``` r
pak::pak("zearoby/shinyMonaco")
# or via
devtools::install_github("zearoby/shinyMonaco")
# install_github() was deprecated in devtools 2.5.0
```

## Getting Started

### Example 1

``` r
shiny::runApp(system.file("examples/example-01.R", package="shinyMonaco"))
```

![](D:/Code_Project/R/shinyMonaco/inst/images/example-screenshot-01.png)

### Example 2

``` r
shiny::runApp(system.file("examples/example-02.R", package="shinyMonaco"))
```

![](D:/Code_Project/R/shinyMonaco/inst/images/example-screenshot-02.png)

## Thanks for below projects

- [monaco-editor](https://github.com/microsoft/monaco-editor)
- [Typo.js](https://github.com/cfinke/Typo.js)
