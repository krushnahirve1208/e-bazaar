const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");
const connectDB = require("./config/db");
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
