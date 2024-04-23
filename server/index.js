
const express=require('express');
require('dotenv').config()
const cors=require('cors')
const {mongoose}=require('mongoose')
const app = express();
const cookiePraser=require('cookie-parser')
//db connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Database Connected'))
.catch((err)=> console.log('Database not connected',err))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//middleware
app.use(express.json());
app.use(cookiePraser());
app.use(express.urlencoded({extended:false}))


//other routes
app.use('/', require('./routes/authRoutes'))
// register and auth routes
app.use("/api/users", require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))

const port=process.env.PORT
app.listen(port, () => console.log(`Server  is running on port ${port}`))