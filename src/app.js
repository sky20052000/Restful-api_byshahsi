
const express = require('express');
const app = express();
require("./db/conn");
const Student = require("./models/student");
const port = process.env.PORT ||8000;
//middleware

app.use(express.json()); 

// create student api
// here we use promises
/*
app.post("/student",(req,res)=>{
    console.log(req.body);
    const user = new Student(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    })
  
})
*/
// now we use async and await to handle
app.post("/student", async(req,res)=>{
    try{
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
    } catch(err){
        res.status(400).send(err);
    }
})
// read the registerd student data
 app.get("/students", async(req,res)=>{
     try{
        const readStudents = await Student.find();
        res.send(readStudents);
     } catch(err) {
         res.send(err)
     }
 })

 // get the individual student data by using id
 app.get("/students/:id", async(req,res)=>{
     try{
           const _id = req.params.id;
         const readStudent = await Student.findById(_id);
         if(!readStudent) {
             res.status(404).send();
         }else{
            res.send(readStudent);
         }
         
     } catch(err){
         res.status(500).send(err);
     }
 })


 // update students data
 app.patch("/students/:id", async(req,res)=>{
     try{
        const _id = req.params.id;
        const updateStu = await Student.findByIdAndUpdate(_id,req.body ,{
            new:true
        });
        res.send(updateStu);
     } catch(err){
         res.status(400).send(err);
     }
 })

 // Delete student records

 app.delete("/students/:id", async(req,res)=>{
     try{
     const _id  = req.params.id;
     const deleteStudent = await Student.findByIdAndDelete(_id);
     if(!deleteStudent) {
         return res.status(400).send();
     }else{
         res.send(deleteStudent);
     }
     } catch(err){
         res.status(500).send(err);
     }
 })
app.listen(port,()=>{
    console.log(`Server is running on the ${port}`);
})
