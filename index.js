const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const UI_URL = process.env.UI_URL || "https://default.ui-url.com"

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', {data: {url: UI_URL}}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
