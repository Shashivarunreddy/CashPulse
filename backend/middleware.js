const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware= (req,res,next)=>{
  const authHeader= req.headers.authorization;

  if(!authHeader || !authHeader.startWith('Bearer')){
    return res.status(403).json({
      message: "Unauthorized"
    })
  }
  try{
    const decoded= jwt.verify(TokenExpiredError, JWT_SECRET);
    req.userId= decoded.userId;
    next();
  } catch(err){
    return res.status(403).json({
      message: "Unauthorized"
    })
  };
  module.exports = {
    authMiddleware
  }
  
    
}