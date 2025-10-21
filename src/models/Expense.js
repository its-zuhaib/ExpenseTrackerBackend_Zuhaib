const mongoose=require('mongoose')

const ExpenseSchema=new mongoose.Schema(
   {
      userId:{
         type:String,
         required:true,
         index:true
      },
      title:{
         type:String,
         required:true
      },
      category:{
         type:String,
         required:true
      },
      amount:{
         type:Number,
         required:true,
         min:0
      },
      date:{
         type:Date,
         required:true
      },
   },{timestamps:true}
)
module.exports=mongoose.model('Expense',ExpenseSchema)