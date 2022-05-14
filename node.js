

const fs=require("fs")
//fs.writeFile("newFile", "new file 2 conent", ()=>console.log("eror"))
//fs.writeFileSync("newFile", "new file 2 conent")
//fs.writeFile("newFile.js", "console.log(nice!)", ()=>console.log("eror"))
//fs.unlink("newFile.js", ()=>console.log("eror"))
const funcRecord=(fileName, content)=>{
    fs.writeFileSync(fileName,content.toString())
}
funcRecord("new2.js", "nice!")
fs.writeFile("newFile.js", "console.log(`nice!`)", (error)=> console.log(error))

fs.writeFileSync("newFile", "new file 2 conent")
fs.unlinkSync("new2.js")
console.log(fs.readFileSync("newFile", "utf-8"));