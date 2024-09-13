const fs = require('fs');
const https = require('https');
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

// SSL options
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/kharcha.online/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/kharcha.online/fullchain.pem')
};

// Use HTTPS to create a secure server
https.createServer(sslOptions, app).listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB and listening securely on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});

// Routes
app.use("/", userRoutes);
app.use("/expense", expenseRoutes);
