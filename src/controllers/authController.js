const axios=require('axios')
const admin=require('../firebase/firebaseConfig')

const key=process.env.FIREBASE_WEB_API_KEY;


exports.registerUser=async(req,res)=>{
   const {email,password}=req.body;
   if(!email){
      return res.status(400).json({message:'Email required'})
   }
   else if(!password){
      return res.status(400).json({message:"Password required"})
   }
   try{
      const response=await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,{
         email:email,
         password:password,
         returnSecureToken:false
      });
      res.status(201).json({
         message:'User registered successfully',
         uid:response.data.localId
      }
   )
}
catch(error){
   const errorMessage=error.response?.data?.error?.message|| 'Unknown error';
   res.status(400).json({message:errorMessage})
}
};

exports.loginUser=async(req,res)=>{
   const {email,password}=req.body;
   if(!email){
      return res.status(400).json({message:'Email required'})
   }
   else if(!password){
      return res.status(400).json({message:"Password required"})
   }
   try{
      const response=await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,{
         email:email,
         password:password,
         returnSecureToken:true
      })
      res.status(200).json({
         token:response.data.idToken,
         message:'Login successful'
      })
   }
   catch(error){
      const errorMessage=error.response?.data?.error?.message||'Invalid credentials';
      res.status(401).json({message:errorMessage})
   }
}

exports.logoutUser=async(req,res)=>{
   try{
      const uid=req.uid;
      await admin.auth().revokeRefreshTokens(uid);
      res.status(200).json({message:'Logout successful'})
   }
   catch(error){
      res.status(500).json({message:"Error logging out",error:error.message})
   }
}