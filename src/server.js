require('dotenv').config();
const cors= require('cors')
const mongoose = require('mongoose');
const PORT=process.env.PORT
require('./firebase/firebaseConfig')
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const express=require('express')
const app=express();

app.use(express.json());
app.use(cors())

const authRoutes=require('./routes/authRoutes')
// const expenseRoutes=require('./routes/expenseRoutes')

app.use('/api',authRoutes);
// app.use('/api',expenseRoutes)

app.get('/',(req,res)=>{
  res.send('backend running')}
)

app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`)
})