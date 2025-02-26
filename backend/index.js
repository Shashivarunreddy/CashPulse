const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./routes/index');
app.use(cors());
app.use(express.json());

 // Ensure this file exists
app.use("/api/v1/", mainRouter);

app.listen(3000);