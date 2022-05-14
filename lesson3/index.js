const express = require("express");
const { json } = require("express/lib/response");
const PORT = 5005;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<div> HELLO! Good to see you again...</div>");
});

app.get(
  "/getUser/:name/:password",
  (req, res, next) => {
    const { name, password } = req.params;
    console.log(req.params);
    console.log(name, password);
    if (name !== "mintaka" || password !== "akatnim") {
      res.send("<div>We don't know who you are</div>");
    }
    
    next();
  },
  (req, res) => {
    res.send("<div>Successfully logged in</div>");
  }
);

app.get('/family', (req, res) => {
    let {lastName, NumberOfKids}=req.query;
    lastName=lastName[0].toUpperCase()+lastName.slice(1)
    console.log(req.query
      )
    console.log(lastName, NumberOfKids)
    res.send(`<div><h3> Hi ${lastName} family! </h3> <p> you have ${NumberOfKids} kids</p></div>`);
  });

app.post("/setMembers", (req, res) => {
  console.log(req.body);
  console.log(req.body[0].name);
  console.log(Object.entries(req.body[0]));
  /*req.body:
[
    {"name": "Yossy",
    "ID": "1234",
    "addsres": "12 st. 12/12"},
    {"name": "Dany",
    "ID": "2345",
    "addsres": "23 st. 23/23"},
    {"name": "Ely",
    "ID": "3456",
    "addsres": "34 st. 34/34"},
    {"name": "Rafy",
    "ID": "4567",
    "addsres": "45 st. 45/45"}
    ,{"name": "Chayim",
    "ID": "5678",
    "addsres": "56 st. 56/56"}
]

  */
  let htmlReq=``
  req.body.forEach(element => {
      let memberDiv=``
      Object.entries(element).forEach(entry=>{
          const thisLi=`<li>${entry[0]}: ${entry[1]}</li>`;
          memberDiv+=thisLi;
      })
    /*  Object.keys(element).forEach(key=>{
       //   console.log("key",key, element.name)     
      const thisLi=`<li>${key}: ${element.key}</li>`;
        memberDiv+=thisLi;
      //  console.log(thisLi);
      })*/
     // console.log("memberDiv",memberDiv);
      htmlReq+=`<ul>${memberDiv}</ul>`
  });

  res.send(`<div>${htmlReq}</div>`);

  /*res.send:
  <div>
	<ul>
		<li>name: undefined</li>
		<li>ID: undefined</li>
		<li>addsres: undefined</li>
	</ul>
	<ul>
		<li>name: undefined</li>
		<li>ID: undefined</li>
		<li>addsres: undefined</li>
	</ul>
	<ul>
		<li>name: undefined</li>
		<li>ID: undefined</li>
		<li>addsres: undefined</li>
	</ul>
	<ul>
		<li>name: undefined</li>
		<li>ID: undefined</li>
		<li>addsres: undefined</li>
	</ul>
	<ul>
		<li>name: undefined</li>
		<li>ID: undefined</li>
		<li>addsres: undefined</li>
	</ul>
</div>
*/
});

app.listen(PORT);
