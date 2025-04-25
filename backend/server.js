const mongoose = require("mongoose")
const express = require("express")
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://vickyreddy123321:adgjmptw@login.lcxgx.mongodb.net")
.then(()=>{console.log("connected to DataBase")})
.catch((err)=>{console.log(err)})

const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        reqired:true
    },
    isCompleted:{
        type:Boolean,
    }
});

const Task = mongoose.model('task',taskSchema);

//Create
app.post('/api/task',async (req,res) => {

    try{
        const newTask = new Task({
            task : req.body.task,
            isCompleted:req.body.isCompleted || false
        })
        const saved = await newTask.save()
        if(saved)
        {
            res.status(200).json({message:'ok'})
        }
        else
        {
            res.status(400).json({message:'error occured'})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err.message})
    }
});

//Read
app.get('/api/task',async (req,res)=>{
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        res.status(400).json({err:err.message});
    }
})

//update
app.put('/api/task',async (req,res)=>{
    try 
    {
        const updatedTask = await Task.findById(req.body.id)

        if(!updatedTask)
        {
            return res.status(200).json({message:'error'})
        }
        updatedTask.task = req.body.task;
        updatedTask.isCompleted = re.body.isCompleted;

        const saved = await updatedTask.save()
        res.status(200).json({message:'ok'})
    }
    catch (err) {
        res.status(400).json({err:err.message});
    }
});

//Delete 
app.delete('/api/task',async (req,res)=>{
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id)
        if(!deleted)
        {
            return res.status(400).json({message:'error'})
        }
        res.status(200).json(deleted)
    } catch (error) {
        res.status(400).json({err:err.message});
    }
})

app.listen(3000,()=>{console.log("backend runing on port 3000")})