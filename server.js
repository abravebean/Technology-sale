const express = require('express');
const app = express()
const Product = require('./models/products.js')
const methodOverride= require('method-override')
require('dotenv').config()
const PORT = process.env.PORT

//MONGOOSE
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUNifiedTopology: true,
})
app.use(methodOverride("_method"))
//MIDDLEWARE 
app.use(express.urlencoded({extended: true}))

//BUY
app.patch('/product/:id', (req, res)=>{
  Product.update({_id: req.params.id}, {$inc: {quantity: -1}},
(error, updatedCount)=>{res.redirect('/product/');
  });
});
//INDEX
app.get('/product/',(req,res)=>{
    Product.find({},(error,allProduct)=> {  
    res.render('index.ejs',{product: allProduct})
})
})

//NEW
app.get('/product/new', (req, res) => {
    res.render('new.ejs')
})

//DELETE
app.delete('/product/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id, (err,data)=>{
        res.redirect('/product');
      });
  });


//UPDATE
app.put("/product/:id", (req, res) => {
   
    Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedProduct) => {
        res.redirect(`/product/${req.params.id}`)
      }
    )
  })
//CREATE
app.post('/product', (req, res) => {
    console.log(req.body)
    Product.create(req.body, (error, createdProduct) => {
        res.redirect("/product")

      })
    })
//EDIT
app.get('/product/:id/edit', (req,res)=>{

  Product.findById(req.params.id, (err, foundProduct)=>{
    res.render(
      'edit.ejs',
      {product: foundProduct, id: [req.params.id]
    });
  });
});
  //PUT
app.put('/:id', (req,res)=>{
  Product.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel)=>
  {
    res.redirect('/product');});
});

// SHOW
app.get("/product/:id", (req, res) => {
    Product.findById(req.params.id, (err, product) => {
      res.render("show.ejs", { product: product,
        id: [req.params.id]
      });
     })
    })
  

// Database Connection Logs
const db = mongoose.connection
db.on("error", (err) => console.log(err.message))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))
//LISTENER
app.listen(PORT, ()=> console.log(`You are listening to the smoothe sounds of port ${PORT}...`))