const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Product = require("../models/Product")


router.post("/products/:productid/review", async(req,res)=>{

    const {productid}= req.params;

    const { rating , comment} = req.body;

    //find the product in which you want to add review

    const product = await Product.findById(productid);


     // Adding the review in the database

    let review = await Review.create({rating , comment});

       await product.review.push(review);

       await product.save();

       res.redirect(`/products/${productid}`)

})










module.exports= router