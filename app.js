const express = require('express')
const app = express()
const port = 3000
require('./config/mongoose')
const restaurantsList = require("./restaurant.json").results

// require express-handlebars here
const exphbs = require('express-handlebars')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//set static file
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurantsInfo: restaurantsList })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const inputId = req.params.restaurantId
  const restaurantInfo = restaurantsList.find((data) => {
    return data.id === Number(inputId)
  })
  res.render('show', { restaurantsInfo: restaurantInfo })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keywords.trim().toLowerCase()
  const filteredContent = restaurantsList.filter((data) => {
    return data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
  })
  res.render('index', { restaurantsInfo: filteredContent, keyword: keyword })
})

app.get('/restaurant/new', (req, res) => {
  res.render('new')
})

app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const restaurantId = req.params.restaurantId
  const restaurantInfo = restaurantsList.find(data => data.id === Number(restaurantId))
  res.render('edit', { data: restaurantInfo })
})


app.listen(port, () => {
  console.log(`Listen on http://localhost:${port}`)
})