const express = require("express");
const path = require("path")
const engine = require("ejs-mate")
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");



// All Product Routes
const productRouter = require("./routes/productRoutes");

//Review Routes

const reviewRouter = require("./routes/reviewRoutes")


// Middlewares
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.engine("ejs", engine)
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views" ))



//Connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/shopping-cart")
.then(()=> console.log(" DB CONNECTED!"))
.catch((err)=> console.log(err));


app.get("/", (req,res)=>{

    res.render("index")
})



// Routers
app.use( productRouter);  // using router
app.use(reviewRouter);



app.listen(PORT, ()=>{

    console.log(` server running at port ${PORT}`)
})