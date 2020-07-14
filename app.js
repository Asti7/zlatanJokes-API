const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/zlatanJokeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const jokesSchema = new mongoose.Schema({
  joke: String,
});

const Joke = mongoose.model("Joke", jokesSchema);

app.get("/", (req, res) => {
  Joke.find({}, (err, foundJokes) => {
    if (!err) {
      let randomJoke = foundJokes[Math.floor(Math.random() * foundJokes.length)];
      res.send(randomJoke.joke);
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
