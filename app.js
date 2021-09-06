const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const jsonParser=bodyParser.json()
const fs=require('fs')
const mongoose=require('mongoose')
const User=require('./tests')
const url='mongodb+srv://shourya:bPOjBD3sVi4T3TAt@cluster0.wbqch.mongodb.net/mydata?retryWrites=true&w=majority'
mongoose.connect(url,
{ 
    useNewUrlParser:true, 
    useUnifiedTopology:true
}
)

const hostname='127.0.0.1'


app.post('/register', jsonParser, (req,res)=>{
    const data= new User({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        email: req.body.email,
        password: req.body.password, 
        gender: req.body.gender,
        body:[],
        share:[]
    })
    data.save().then(result=>res.status(201).json(result)).catch(err=>res.status(500))
})

app.post('/sign-in',jsonParser, (req,res)=>{
    User.findOne({email: req.body.email}).then(result=>{
        if(result.password=== req.body.password){
            res.status(200).send(result)
            
        }
        else{
            console.log('user is not valid')
            res.status(400).end()
        }
    }).catch(err=>res.status(500).end())
    
})

app.get('/api', (req,res)=>{
    User.find().then(result=>res.status(200).json(result)).catch(err=>console.log(err))
    })
app.get('/abc', (req,res)=>{
User.find({_id:`6124b1732f80ce118cd7b8d2`}).then(result=>res.status(200).json(result)).catch(err=>console.log(err))
    })
    
app.put('/api', jsonParser,(req,res)=>{
        
        User.updateOne({_id: req.body._id}, {$set:{body:req.body.body}}).then(result=>res.status(201).json(result)).catch(err=>console.warn(err))
} )
app.put('/share', jsonParser, (req, res)=>{
    User.updateOne({email: req.body.email}, {$push:{share: req.body.share}}).then(result=>res.status(201).json(result)).catch(err=>console.warn(err))
})
app.listen(3001, hostname, ()=>{
    console.log(`listening at http://${hostname}:3001`)
})