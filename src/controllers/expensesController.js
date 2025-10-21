const Expense=require('../models/Expense')

exports.fetchAllExpenses=async(req,res)=>{
   try{

      const userId=req.user.uid
      const expenses=await Expense.find({userId}).sort({date:-1})
      res.status(200).json(expenses)
   }
   catch(error){
      res.status(500).json({
         message:'Error fetching expenses',
         error:error.message
      })
   }
}


exports.fetchExpenseById=async(req,res)=>{
   try{

      const userId=req.user.uid;
      const expenseId=req.params.id
      const expense= await Expense.findOne({_id:expenseId,userId})

      if(!expense){return res.status(404).json({message:'Expense not found'})}
      
      res.status(200).json(expense);
   }
   catch(error){
      res.status(500).json({message:'Error fetching expense',error:error.message})
   }
}


exports.addExpense=async(req,res)=>{
   try{

      const userId=req.user.uid;
      const{title,amount,category,date}=req.body
      if(!title||!amount||!category||!date){
         return res.status(400).json({message:'Missing required fields'})
      }
      const newExpense=Expense({
         userId,
         title,
         amount,
         category,
         date
      });
      await newExpense.save();
      
      res.status(201).json({
         message:"Expense added successfully",
         id:newExpense._id
      });
   }
   catch(error){
      res.status(500).json({message:'Error adding expense',error:error.message})
   }
      
   
}
exports.updateExpense=async(req,res)=>{
   try{
      
      const userId=req.user.uid
      const expenseId=req.params.id;
      const {title,amount,category,date}=req.body
      const expense=await Expense.findOne({_id:expenseId,userId})
      if(!expense){
         return res.status(404).json({message:'Expense not found'})
      }
      if (title !== undefined) expense.title = title;
      if (amount !== undefined) expense.amount = amount;
       if (category !== undefined) expense.category = category;
      if (date !== undefined) expense.date = date;
      await expense.save()
      res.status(200).json({ message: 'Expense updated successfully' });
      
   }
   catch(error){
      res.status(500).json({ message: 'Error updating expense', error: error.message });
   } 
}


exports.deleteExpense=async(req,res)=>{
   try{

      const userId=req.user.uid;
      const expenseId=req.params.id
      const deletedExpense=await Expense.findOneAndDelete({_id:expenseId,userId})
      if(!deletedExpense){
         return res.status(404).json({message:"Expense not found"})
      }
      res.status(200).json({message:'Expense deleted succesfully'})
   }
   catch(error){
      res.status(500).json({ message: 'Error deleting expense', error: error.message });
   }

   
}