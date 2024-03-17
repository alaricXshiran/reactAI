const express=require('express');
const dotenv=require('dotenv').config()
const cors=require('cors')
const {mongoose}=require('mongoose')
const app = express();
const cookiePraser=require('cookie-parser')
//db connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Database Connected'))
.catch((err)=> console.log('Database not connected',err))


//middleware
app.use(express.json());
app.use(cookiePraser());
app.use(express.urlencoded({extended:false}))



app.use('/', require('./routes/authRoutes'))

const port=8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))