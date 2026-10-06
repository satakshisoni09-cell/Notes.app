const result = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const Userroute = require('./routes/user');
const Noteroute = require('./routes/note');
const cookieParser = require('cookie-parser');
const { requireLogin } = require('./middleware/auth');
console.log(result);
console.log("MongoDB URL:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB connected"))
.catch((err)=> console.log(err));

app.set("view engine", "ejs");
app.set("views", "./views");


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/user", Userroute);
app.use("/notes", requireLogin, Noteroute);


app.get('/', (req, res) => {
  if (req.cookies.token) {
    res.redirect('/notes');
  } 
  res.redirect("/user/signup");
});






app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});