const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(express.static("public"));


app.get("/",(req,res)=>{
  // res.sendFile(__dirname + "/index.html");
  res.render("index");
});


//----------BACKEND WORK --------------------------

mongoose.connect(
  "mongodb+srv://admin-Astitva:Apexpredator7@zlatanjokes.j5741.mongodb.net/zlatanJokeDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const jokesSchema = new mongoose.Schema({
  joke: String,
});

const Joke = mongoose.model("Joke", jokesSchema);

app.get("/joke", (req, res) => {
  Joke.find({}, (err, foundJokes) => {
    if (!err) {
      let randomJoke =
        foundJokes[Math.floor(Math.random() * foundJokes.length)];
      res.send(randomJoke);
    } else {
      res.send(err);
    }
  });
});



// 404 page 
app.use("*",(req, res)=> {
  res.render("404");
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{
  console.log("Server started on required port.");
});