const scrollProducts = async (page) => {
  let scrollPosition
  while (true) {
    scrollPosition = await page.evaluate('document.body.scrollHeight')
    await page.evaluate('Window.scrollTo(0, document.body.scrollHeight')
    await page.waitForTimeout(2000)
    let newScrollPosition = await page.evaluate('document.body.scrollHeight')
    if (newScrollPosition === scrollPosition) break
  }
}
module.exports = { scrollProducts }
