const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {type: String, require: true},
    discription:{type:String, require: true}
});

const noteModel= mongoose.model("note", noteSchema);
module.exports = noteModel;