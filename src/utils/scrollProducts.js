const scrollProducts = async (page) => {
  let scrollPosition
  while (true) {
    scrollPosition = await page.evaluate('document.body.scrollHeight')
    for (let i = 0; i < 400; i++) {
      await page.mouse.wheel({ deltaY: 500 })
    }
    let newScrollPosition = await page.evaluate('document.body.scrollHeight')
    if (newScrollPosition === scrollPosition) {
      break
    } else {
      for (let i = 0; i < 400; i++) {
        await page.mouse.wheel({ deltaY: 500 })
      }
    }
  }
}
module.exports = { scrollProducts }
