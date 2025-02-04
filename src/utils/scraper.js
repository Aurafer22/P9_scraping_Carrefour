const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { scrollProducts } = require('./scrollProducts')
const { getProducts } = require('./getProducts')
puppeteer.use(StealthPlugin())

const scraper = async (url, word) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 })
  const page = await browser.newPage()
  const newUrl = `${url}?q=${word}`
  await page.goto(newUrl, { waitUntil: 'load' })
  await page.setViewport({ width: 1200, height: 1024 })
  const acceptCookies = await page.waitForSelector(
    '#onetrust-accept-btn-handler'
  )
  await acceptCookies.click()
  await page.waitForSelector('#search-input', {
    visible: true
  })
  // await page.click('input#search-input')
  // await page.keyboard.press('Enter')
  // await page.type(
  //   'input.ebx-search-box__input.ebx-search-box__input-query',
  //   'ibericos',
  //   { delay: 100 }
  // )
  // await page.keyboard.press('Enter')
  await scrollProducts(page)
  await page.waitForSelector('.ebx-result__wrapper', {
    visible: true
  })
  await getProducts(page)
  browser.close()
}

module.exports = { scraper }
