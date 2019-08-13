const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .get('/', (req, res) => res.render('pages/index'))
  .post('/', (req, res) => {
    console.log(req);
    console.log(res);
    res.end();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
