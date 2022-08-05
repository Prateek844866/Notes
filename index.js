const express = require("express")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")


const encoder = bodyParser.urlencoded()
const app = express()
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"prateekanojia2002@gmail.com",
        pass:"yugwdvkerjgeftro"
    }
})

app.set("view engine","hbs")
app.use(express.static(path.join(__dirname,"./views/public")))
hbs.registerPartials(path.join(__dirname,"./views/partials"))

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/notes",(req,res)=>{
    res.render("notes")
})
app.get("/info",(req,res)=>{
    res.render("info")
})
app.get("/contact",(req,res)=>{
    res.render("contact",{"show":false})
})
app.post("/contact",encoder,(req,res)=>{
    let mailOption = {
        from:"prateekanojia2002@gmail.com",
        to:req.body.email,
        subject:"Your Query Received!!! : Team Company",
        text : "Thanks to Share Your Query with Us!!!\nOur team Will Contact Your Soon\n"
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })
    mailOption = {
        from:"prateekanojia2002@gmail.com",
        to:"yugwdvkerjgeftro",
        subject:"Query Received!!! : Team Company",
        text : `
            Name :  ${req.body.name}
            Email :  ${req.body.email}
            Phone :  ${req.body.phone}
            Subject :  ${req.body.subject}
            Message :  ${req.body.message}
        `
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })
    res.render("contact",{"show":true})
})

app.get("/post",(req,res)=>{
    res.render("post")
})

app.listen(8000,()=>{
    console.log("Server is Running at PORT 8000...");
})