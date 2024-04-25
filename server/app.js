require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const UserAuthRouter = require("./routes/UserAuthRouter.js");
const ProductRouter = require("./routes/ProductRouter.js");

const dbConnect = require("./lib/dbConnect.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4000; // Define the PORT variable once

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URI || 5173, credentials: true }));

// routes
app.use("/user", UserAuthRouter);
app.use("/user", ProductRouter);


dbConnect();

// checkout api
app.post("/create-checkout-session",async(req,res)=>{
  const {products} = req.body;


  const lineItems = products.map((product)=>({
      price_data:{
          currency:"inr",
          product_data:{
              name:product.dish,
              images:[product.imgdata]
          },
          unit_amount:product.price * 100,
      },
      quantity:product.qnty
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:5173/success",
      cancel_url:"http://localhost:5173/cancel",
  });

  res.json({id:session.id})

})

app.listen(PORT, () => {
  console.log(`The server is running in port ${PORT}`);
});
