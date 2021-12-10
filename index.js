const express=require("express");
const mongoose=require("mongoose");
const port=4000;
const host="localhost";
const bodyParser=require("body-parser");
const app=express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json()) ;

// connectivity with the mongodb
mongoose.connect("mongodb://localhost:27017/raodb").then(()=>{
    console.log("server is working");
}).catch((err)=>{
    console.log(err);
});
const product=new mongoose.Schema({
    name:String,
    email:String,
    pass:Number
});

const Product=new mongoose.model("Product",product);

// create product
app.post("/api/v1/product/new",async(req,res)=>{
   const addproduct = await Product.create(req.body);
   res.status(201).json({
    succes:true,
    addproduct
   })
});

// read product

app.get("/api/v1/read",async(req,res)=>{
    const readproduct = await Product.find();
    res.status(200).json({
        success:true,
        readproduct
    })
});

// update product

app.put("/api/v1/product/:id",async(req,res)=>{
    let product= await Product.findById(req.params.id);
    if(!product){
       return res.status(500).json({
            success:true,
            message:"product not found"
        });
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
    });

    res.status(200).json({
        success:true,
        product
    });
});

// delete query

app.delete("/api/v1/product/:id",async(req,res)=>{
        const product = await Product.findById(req.params.id);
        await product.remove();
        res.status(200).json({
            success:true
        });
});

app.listen(4000,()=>{
    console.log(`server is working`);
});




