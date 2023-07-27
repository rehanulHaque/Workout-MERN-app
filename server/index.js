require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const workoutRouter = require("./routes/workoutRoute");
const userRoute = require("./routes/userRoute");

app.use(cors());
app.use(express.json());

app.use("/api/workout", workoutRouter);
app.use("/api/user", userRoute);

const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      app.listen(port, () => {
        console.log(`DB connected & App listening on port ${port}!`);
      });
    })
    .catch(() => {
      console.log("DB not connected");
    });
};

db();

// yAPSfMhYcR36IEJs
