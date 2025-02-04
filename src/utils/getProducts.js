const fs = require('fs')

const getProducts = async (page) => {
  const products = await page.$$eval('.ebx-result__wrapper', (elements) =>
    elements.map((el) => ({
      img: el.querySelector('img.ebx-result-figure__img')?.src || 'No image',
      name:
        el
          .querySelector('h1.ebx-result-title.ebx-result__title')
          ?.textContent.trim() || 'No name',
      price:
        el.querySelector('.ebx-result-price__value')?.textContent.trim() ||
        'No price'
    }))
  )
  fs.writeFile(`./data.json`, JSON.stringify(products), (err) =>
    err ? console.log(err) : null
  )
}
module.exports = { getProducts }

// `const results = ${JSON.stringify(products)}`
