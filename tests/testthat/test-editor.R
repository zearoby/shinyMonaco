# Check editor function

testthat::test_that("editor", {
   testthat::expect_error(shinyMonaco::editor())
})
