import express, { Request, Response, NextFunction } from "express";
const { dbHandler } = require("./src/db/db");
const app = express();
const port = 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await dbHandler.getAllProducts();
    res.json(products.Items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not get products" });
  }
});

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const product = await dbHandler.getProduct();
    res.json(product.Items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not get products" });
  }
});

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    await dbHandler.deleteProduct();
    res.status(200).send("product deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not delete product" });
  }
});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    dbHandler.updateInventory(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "can not update product" });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
