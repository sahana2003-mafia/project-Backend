const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

var products = [
  { id: 1, name: "Laptop", qty: 10 },
];

app.get("/", (req, res) => {
  res.send("Welcome to Product Management API");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const product = products.find((p) => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ msg: "Product not found" });
  }
});

app.post("/products", (req, res) => {
  const { id, name, qty } = req.body;
  const newProduct = { id, name, qty };
  products.push(newProduct);
  res.json({ product: newProduct, msg: "Product added successfully" });
});

app.put("/products/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const { name, qty } = req.body;
  const index = products.findIndex((p) => p.id === id);

  if (index !== -1) {
    products[index] = { ...products[index], name, qty };
    res.json({ updatedProduct: products[index], msg: "Product updated successfully" });
  } else {
    res.status(404).json({ msg: "Product not found" });
  }
});

app.delete("/products/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const index = products.findIndex((p) => p.id === id);

  if (index !== -1) {
    products.splice(index, 1);
    res.json({ msg: "Product deleted successfully" });
  } else {
    res.status(404).json({ msg: "Product not found" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
