const {Router} = require("express");
const router = Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");




router.get("/signup", (req,res)=>{
    return res.render("signup");
});

router.get("/signin", (req,res)=>{
    return res.render("signin");
});
router.get("/logout", (req,res)=>{
    res.clearCookie("token");
    return res.redirect("/user/signin");
});
router.post("/signin", async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
        return res.render("signin", { error: "Wrong email or password" });
        }
       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
       return res.render("signin", { error: "Wrong email or password" });
    }
const payload = {
    _id: user._id,
    email: user.email,
    fullname: user.fullname,
};
const token = jwt.sign(payload, secret, {expiresIn: "1h"});
res.cookie("token", token, {httpOnly: true});
return res.redirect("/");
}
    catch(error){
        console.error(error);
       return res.render("signin", { error: "Wrong email or password" });
    }
});

router.post("/signup", async(req,res)=>{
    const {fullname, email , password} = req.body;
    try{
     const hashedpassword=await bcrypt.hash(password,10);
      await User.create({
        fullname,
        email,
        password: hashedpassword,
    });
    res.redirect("/user/signin");
    }
    catch(error){
        console.error(error);
        return res.render("signup", { error: "Email already exists" });
    }
});


module.exports = router;