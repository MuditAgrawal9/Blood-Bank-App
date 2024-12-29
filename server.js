const express = require("express");
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors');
const connectDB = require("./config/db");
//dotenev config
dotenv.config()

//mongodb connection
connectDB();
//rest object
const app = express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev')) 

//routes
//test route
app.use('/api/v1/test', require("./routes/testRoutes"))
//auth route
app.use('/api/v1/auth',require("./routes/authRoutes"))
//inventory route
app.use('/api/v1/inventory',require("./routes/inventoryRoute"))
//analytics route
app.use('/api/v1/analytics',require("./routes/analyticsRoute"))


//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`.bgGrey.white);
});
