
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://userayush:1234@cluster0.p7zfp.mongodb.net/Portfolio")
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });
