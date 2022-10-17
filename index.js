const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// routes
const TaskRoute = require('./Routes/TaskRoute');


const PORT = process.env.PORT || 4000;


//connect with mongodb
const connectDB = async() =>{
  try{
      const conn = await mongoose.connect(process.env.MONGO_URI,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
  }catch(error){
      console.log(`Error: ${error.message}`);
      process.exit();
  }
}



app.use('/api',TaskRoute);

app.listen(PORT, (error) => {
  if(error){
    console.log("server failed");
  }else{
    console.log("server is running on port ", PORT);
    connectDB();
  }
  
});

