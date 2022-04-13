const express = require('express')
const uid = require('uid2')

const data = []

const routerProduct = express.Router()

routerProduct.get('/', async (req, res) => {
    res.status(200).json(data)
})

routerProduct.get('/:id', async (req, res) => {
    res.status(200).json(data[req.params.id]) 
})


routerProduct.post('/', async(req, res) => {
    const id = uid(10)
    const { product, price, img } = req.body
    await data.push({ id, product, price, img }) 
    res.status(201).json({ status: `Product saved with Id: ${id}` })
})

routerProduct.put('/:id', async(req, res) => {
    const { product, price, img } = req.body
    await data.find(idToFound => {
        idToFound.id === Number(req.params.id) 
        ?
            (idToFound.price = price,
            idToFound.img = img,
            idToFound.product = product)
        : ''
    })
    res.json({status: 'Product updated'})
})

routerProduct.delete('/:id', async(req, res) => {
    await data.filter(el => el.id !== Number(req.params.id))
    res.json({ status: 'Product deleted' })
})

module.exports = routerProduct