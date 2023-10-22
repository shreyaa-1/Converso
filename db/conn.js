const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongodbconn = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {console.log("db connected");})
  .catch((err) => {console.log(err);});

module.exports = mongodbconn;
