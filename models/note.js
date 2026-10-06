const {Schema, model} = require("mongoose");

const  noteSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,  
    },
    createdBy :{
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, {timestamps:true});

const Note = model("note", noteSchema);

module.exports = {
     Note,
}