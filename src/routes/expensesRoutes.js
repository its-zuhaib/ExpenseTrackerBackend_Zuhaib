const express=require('express')
const router=express.Router();


const {
   fetchAllExpenses,
   fetchExpenseById,
   addExpense,
   updateExpense,
   deleteExpense
}=require('../controllers/expensesController');

const authMiddleware=require('../middleware/authMiddleware')
router.use(authMiddleware)
router.get('/expenses',fetchAllExpenses)
router.get('/expenses/:id',fetchExpenseById)
router.post('/expenses',addExpense)
router.put('/expenses/:id',updateExpense)
router.delete('/expenses/:id',deleteExpense)

module.exports=router