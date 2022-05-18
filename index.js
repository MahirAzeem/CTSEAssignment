const express = require( "express" );
const app = express();
const port = 3000; // default port to listen
const bodyparser = require('body-parser');
app.use(bodyparser.json());
let { productData } = require("./productData")

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send("Welcome to Product Management Page");
});

app.get( "/products", ( req, res ) => {
    res.send(productData);
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});

app.get("/product/:id", (req,res) => {
    let id = +req.params.id;
    let product = productData.find((prod) => prod.id === id);
    if(product)
        res.send(product);
    else
        res.status(404).send("No Product Found");
})

app.post("/product/add", async (req,res) => {
    let body = await req.body;
    console.log(body);
    let maxid = productData.reduce((acc , curr) => (curr.id >= acc ? curr.id : acc), 0);
    let newid = maxid + 1;
    let newProduct = { id: newid, ...body };
    productData.push(newProduct);
    res.send(newProduct)
});

app.put("/product/update/:id", (req,res) => {
    let id = +req.params.id;
    let body = req.body;
    let index = productData.findIndex((prod) => prod.id === id);
    if(index >= 0) {
        let updatedProduct = { id: id, ...body };
        productData[index] = updatedProduct;
        res.send(updatedProduct);   
    }else res.status(404).send("No Product Found")
    
}) 

app.delete("/product/delete/:id", (req, res) => {
    let id = +req.params.id;
    let index = productData.findIndex((prod) => prod.id === id);
    if(index >= 0) {
        let deletedProduct = productData.splice(index, 1);
        res.send(deletedProduct);
    }else res.status(404).send("No Product Found")
})
