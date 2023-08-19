const express = require('express');
const bodyParser = require('body-parser');
 const cors  = require('cors');
 const userRouter  = require("./routes/user.js");
 const dotenv  = require('dotenv')
const studentsRoutes = require("./routes/students.js")

const app = express();
dotenv.config({path:"./.env"})
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.get("/",(req,res)=>{
  res.send("API RUNNING")
})
// app.use('/posts', postRoutes);
app.use('/user',userRouter)
app.use("/student" , studentsRoutes)

const PORT = process.env.PORT|| 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


