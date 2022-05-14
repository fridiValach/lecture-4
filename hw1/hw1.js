const express = require("express");
const app = express();
app.use(express.json())
const htmlTags = require(`../../node js/hw1/htmlTags`);
console.log("htmlTags",htmlTags);
 
htmlTags.forEach((el) => {
    console.log(htmlTags.el)
    let {tag}=el
      app.get("/" + el.name, (req, res) => {
        res.send(tag);
      });
    });
    

app.post("/",(req, res)=>{
    res.send("OK")
    console.log(req.body)
})
app.listen(5001);
