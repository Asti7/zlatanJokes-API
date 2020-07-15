const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
      res.send(randomJoke.joke);
    } else {
      res.send(err);
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);