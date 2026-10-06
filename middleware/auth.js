const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

function requireLogin(req,res,next) {
   const token = req.cookies.token;
   if(!token){
    return res.redirect("/user/signin");
   }
   try{
    req.user = jwt.verify(token, secret);
    next();
   }
   catch(error){
    return res.redirect("/user/signin");
   }
}

module.exports = {
    requireLogin,
}