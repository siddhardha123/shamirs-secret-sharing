const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const app = express()



app.use(cors())
app.listen(3000,()=>{
    console.log("connected.......")
})