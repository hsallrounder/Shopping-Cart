const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Review = require("../models/Review")


// get all products
router.get("/products", async (req, res) => {

   const products = await Product.find({});

   // const success_msg = req.flash("success")

   // const update_msg = req.flash("update")

   // const delete_msg = req.flash("delete")

   res.render("./products/product", { products })

})


// get forms to create a new product
router.get("/products/new", async (req, res) => {

   res.render("./products/new")

})


//create a new product
router.post("/products", async (req, res) => {

   const { name, img, desc, price } = req.body;

   await Product.create({ name, img, desc, price });

   req.flash("success", "your product has been added successfully")

   res.redirect("/products")

})


//show a single product
router.get("/products/:productid", async (req, res) => {

   const { productid } = req.params;

   const product = await Product.findById(productid).populate("review");

   console.log(product)

   res.render("./products/show", { product })

})


// get the edit form
router.get("/products/:productid/edit", async (req, res) => {

   const { productid } = req.params;

   const product = await Product.findById(productid);

   res.render("./products/edit", { product })

})


//update a product
router.patch("/products/:productid", async (req, res) => {

   const { name, img, price, desc } = req.body;

   const { productid } = req.params;

   await Product.findByIdAndUpdate(productid, { img, price, desc, name });

   req.flash("update", "your product has been updated successfully")

   res.redirect("/products");


})


// delete a product
router.delete("/products/:productid", async (req, res) => {


   const { productid } = req.params;

   await Product.findByIdAndDelete(productid);

   req.flash("delete", "your product has been deleted successfully")

   res.redirect("/products")

})


module.exports = router;

