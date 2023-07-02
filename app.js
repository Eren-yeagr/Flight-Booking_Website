const express = require("express");
const path =require('path');
const fs =require('fs');
const app =express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const port=80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    description: String
  });

//mongoose model
const Contact = mongoose.model('Contact', contactSchema);

//express stuff
app.use('/static', express.static('static'));// set serving static file
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug');// set template engine as pug
app.set('views', path.join(__dirname,'views'));// set the view directory

//endpoints
app.get("/",(req,res)=>{
   
    res.status(200).render("home.pug");
});

app.get("/contact",(req,res)=>{
    
    res.status(200).render("contact.pug");
});

app.post("/contact",(req,res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
     res.send("this data is saved to your database")
    }).catch(()=>{
     res.status(400).send("item was not end to the database")
    });

});

//START SERVER
app.listen(port , ()=>{
    console.log("application started sucessfully on the port 80");
})