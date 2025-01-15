const express = require('express');
const mongoose = require('mongoose')
const MenuItem = require('./schema')

const app = express();
const port = 3010

app.use(express.json());

mongoose
  .connect("mongodb+srv://issac:Nemizez038@cluster0.zvt6a.mongodb.net/MenuItems")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/menu", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and Price are required",
      });
    }

    const newMenuItem = await MenuItem.create({
      name,
      description,
      price,
    });
    res.status(201).json({
      success: true,
      message: "New menu item created successfully",
      data: newMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating menu item",
      error: error.message,
    });
  }
});

app.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching menu items",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
