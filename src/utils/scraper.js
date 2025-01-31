const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { scrollProducts } = require('./scrollProducts')
puppeteer.use(StealthPlugin())

const scraper = async (url, word) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 })
  const page = await browser.newPage()
  const newUrl = `${url}?q=${word}`
  await page.goto(newUrl, { waitUntil: 'domcontentloaded' })
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
  await page.waitForNavigation({ waitUntil: 'load' })

  await page.waitForSelector('.ebx-result__wrapper', {
    visible: true
  })

  await scrollProducts(page)

  const products = await page.$$eval('.ebx-result__wrapper', (elements) =>
    elements.map((el) => ({
      img: el.querySelector('img')?.src || 'No image',
      name: el.querySelector('h1')?.textContent.trim() || 'No name',
      price:
        el
          .querySelector('.ebx-result-price.ebx-result__price')
          ?.textContent.trim() || 'No price'
    }))
  )

  console.log(products.length)
  console.log(products)

  browser.close()
}

module.exports = { scraper }
