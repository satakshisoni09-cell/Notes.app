const {Router} = require("express");
const router = Router();
const {Note} = require("../models/note");

router.get("/new", (req,res) =>{
    return res.render("addnote");
});


router.get("/", async(req,res) =>{
    try{
        const notes = await Note.find({createdBy: req.user._id});
        return res.render("notes", {notes});
    }
    catch(error){
        console.error(error);
        return res.status(500).send("Something went wrong");
    }
});
router.get("/:id/edit/", async(req,res) =>{
    try{
        const note = await Note.findOne({_id: req.params.id, createdBy: req.user._id});
        if(!note){
            return res.redirect("/notes");
        }
        return res.render("editnote", {note});
    }
    catch(error){
        console.error(error);
        return res.redirect("/notes");
    }
})

router.post("/", async(req,res) =>{
  const{title, content} = req.body;
  try{ await Note.create({
    title,
    content,
    createdBy: req.user._id,
  });
  return res.redirect("/notes");
  }
    catch(error){   
        console.error(error);
        return res.redirect("/note/new");
}
  });

  router.post("/:id/delete", async(req,res)=>{
    try{
        await Note.deleteOne({_id: req.params.id, createdBy: req.user._id});
    return res.redirect("/notes");
}
catch(error){
    console.error(error);
    return res.redirect("/notes");
}   
  });

router.post("/:id/edit", async(req,res)=>{
    const {title, content} = req.body;
    try{
        const note = await Note.findOne({_id: req.params.id, createdBy: req.user._id});
        if(!note){
            return res.redirect("/notes");
        }
       await Note.updateOne({_id: req.params.id, createdBy: req.user._id}, {title, content});
        return res.redirect("/notes");
    }
    catch(error){
        console.error(error);
        return res.redirect("/notes");
    }
});

module.exports = router;