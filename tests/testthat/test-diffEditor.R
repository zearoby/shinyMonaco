# Check diffEditor function

testthat::test_that("diffEditor", {
   testthat::expect_error(shinyMonaco::diffEditor())
})
