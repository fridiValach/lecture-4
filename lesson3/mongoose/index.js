const mongoose=require ("mongoose")

mongoose.connect("mongodb+srv://learn_node:Cluster1@cluster0.bycyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

const User=require ("./User")



async function saveDB(name,address,email, age){
    const user =new User({name:name,address:address,email:email, age:age})
    console.log(user);
   await user.save()
//console.log(user);
}


async function findUser(){
    User.findById("6279617be11d1e478ba73962")
    User.findOneAndUpdate({name:"Frida"},{name:"Frida",age:25,email:"fridiv.ib@gmail.com"})

    const user=await User.findOne({name:"Frida"})
    //const user=await User.where("age").gt(3).lse(10).where("name").equals("Frida").limit(10).select("age")
    console.log("user",user,user.length);
}

findUser()
//saveDB("Sara")
saveDB("Sara", "adressssssssssssssss", "fridiv@gmail.com", 33).catch(e=>console.log(e))
