const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const PORT = 8000

const uid = require('uid2')

// const routerProduct = require('./routes/routerProducts.routes')

const data = []

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Start of Template Engines

// Handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views/hbs')
app.get('/', (req, res) => {
    res.render('index', { data: data, listExist: data.length === 0 ? false : true })   
})


// Pug
/*
app.set('views', './views/pug')
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    res.render('index.pug', { data: data })   
})
*/

// ejs
/*
app.set('view engine', 'ejs')
app.set('views', './views/ejs')
app.get('/', (req, res) => {
    res.render('index.ejs', { data: data, listExist: data.length === 0 ? false : true })   
})
*/


// End of Template Engines

app.post('/products', async(req, res) => {
    const id = uid(10)
    const { product, price, img } = req.body
    await data.push({ id, product, price, img }) 
    res.redirect('/')
    // res.status(201).json({ status: `Product saved with Id: ${id}` })
})

// app.use('/products', routerProduct)



app.listen(PORT, () => {
    console.log(`Server listen in port ${PORT}`)
})