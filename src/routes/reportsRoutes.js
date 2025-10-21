const express=require('express')
const router=express.Router();

const{
   getMonthlyReports,
   getCategoryReports
}=require('../controllers/reportsController')

const authMiddleware=require('../middleware/authMiddleware')
router.use(authMiddleware)


router.get('/reports/monthly',getMonthlyReports)

router.get('/reports/category',getCategoryReports)

module.exports=router
