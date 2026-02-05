const express = require('express');
const noteModel = require('./models/notes.model');
const cors = require('cors');
const path = require('path')
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("./public"))

//create note
app.post('/api/create-note', async (req, res)=>{
   try {
      const {title,discription} = req.body;
      if(!title|| !discription){
        res.send('all field are required!')
      }else{
        const note = await noteModel.create({
            title, discription
        });
        res.status(201).json({
            message:'note created successfully!',
            note
        })
    }
   } catch (error) {
    console.log(error)
   }
});

//read all notes
app.get('/api/notes', async (req, res)=>{
    const notes = await noteModel.find();
    if(!notes){
        res.send('there no notes created yet!')
    }
    res.status(201).json({
        message:'notes fetched succesfully!'
        , notes
    })
});

//delete a note by id
app.delete('/api/notes/:id',async(req, res)=>{
   const {id}=  req.params;
   if(!id){
    res.send('please enter the id!!')
   }else{
     await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message :'notes deleted succesfully!'
    })
   }
});

//edit or update by id
app.put('/api/notes/:id',async (req, res)=>{
    const {id} = req.params;
    const {title, discription} = req.body;
    const updatedNote =  await noteModel.findByIdAndUpdate(id, {title, discription}, {new:true});

    res.status(200).json({
        message:'note updated successfully!',
        updatedNote
    })

})

//handle unwirtten routes
app.use('*name', (req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"))
})



module.exports = app;