const express = require("express");
const app = express();
const path = require("path")
const mongoose = require("mongoose");
const User = require("./models/User")
const bcrypt = require('bcrypt');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))


app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/authDB")
.then(()=> console.log("DB CONNECTED"))
.catch((err)=> console.log(err))



app.get("/",(req,res)=>{

    res.send("home route")

})

app.get("/register",(req,res)=>{

    res.render("signup");


})

app.post("/register", async(req,res)=>{

    const {username, password} = req.body;

    const salt = await bcrypt.genSalt(12);

    const hash = await bcrypt.hash(password, salt);

    await User.create({username , hash});

    res.redirect("/login")


})

app.get("/login", (req,res)=>{

    res.render("login")


})


app.post("/login", async(req,res)=>{

   const {username,password} = req.body;

   const foundUser = await User.find({username});

   console.log(foundUser)

   if(!foundUser){

     return res.redirect("/register")

   }

    return res.redirect("/dashboard")

})

app.get("/dashboard",(req,res)=>{

    res.send(" you have successfully entered dashboard")
})







app.listen(5000, ()=>{

    console.log("server running")



})

