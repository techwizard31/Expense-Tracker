const https = require('https');
const fs = require('fs');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/authlogics");
const expenseRoutes = require("./routes/expenselogics");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.LINK,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use("/", userRoutes);
app.use("/expense", expenseRoutes);

// Read SSL certificates
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/kharcha.online/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/kharcha.online/fullchain.pem')
};

https.createServer(sslOptions, app).listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongodb and listening at ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
