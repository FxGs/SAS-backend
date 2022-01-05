const express = require("express")
const Product = require("../models/product.model")

const router = express.Router()

router.get("/", (req, res) => res.send("hello world"))

router.post("/product/create", (req, res) => {
    const { inventory, description, name, price } = req.body
    const product = new Product({ inventory, description, name, price })

    product.save((error, product) => {
        if (error) return res.status(400).json({
            error
        })
        if (product) {
            res.status(200).json({
                product
            })
        }
    })
})

router.patch("/product/update/:productId", (req,res) => {
    const { productId } = req.params;
    console.log(productId);
    const { inventory, description, name, price } = req.body
    Product.findByIdAndUpdate(productId, {
        inventory,
        description,
        name,
        price
    }).catch((error) => {
        console.log(error)
        res.status(500).json(error)
    }).then((product) => {
        console.log(product)
        res.status(200).json(product)
    })
})

router.get("/product/get", (req,res) => {
    Product.find({}).exec((error, products) => {
        if (error) return res.status(500).json({
            error
        })
        if (products) {
            res.status(200).json({
                products
            })
        }
    })
})

router.get("/product/getByName", (req, res) => {
    let { productName } = req.query;
    console.log(productName);
    productName = decodeURI(productName);
    console.log(productName);
    Product.findOne({name:productName}).exec((error, product) => {
        if (error) return res.status(500).json({
            error
        })
        if (product) {
            res.status(200).json({
                product
            })
        } else {
            res.status(500).json({
                error: "Product not found"
            })
        }
    })
})

router.delete("/product/delete/:productId", (req, res) => {
    const { productId } = req.params
    console.log(productId);
    Product.findByIdAndRemove(productId).exec((error, product) => {
        if (error) return res.status(500).json({
            error
        })
        if (product) {
            res.status(200).json({
                message: "Product deleted"
            })
        } else {
            res.status(500).json({
                error: "Product not found"
            })
        }
    }) 
})

module.exports = router 