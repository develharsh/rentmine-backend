const mongoose = require("mongoose");

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.");
    return;
  }
  mongoose.connect(
    `${process.env[`NODE_APP_MONGODB_URL_${process.env.NODE_APP_MODE.toUpperCase()}`]}/${
      process.env.NODE_APP_MODE
    }`,
    {
      useNewUrlParser: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to mongodb.", `${process.env[`NODE_APP_MONGODB_URL_${process.env.NODE_APP_MODE.toUpperCase()}`]}/${
        process.env.NODE_APP_MODE
      }`);
    }
  );
};

module.exports = connectDB;
