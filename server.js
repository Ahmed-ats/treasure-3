require('dotenv').config()
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const mongoose = require("mongoose");
const morgan = require("morgan"); // used to see requests
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

//log all requests to the console
app.use(morgan("dev"));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/appDB", {
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

// Init the express-jwt middleware
const isAuthenticated = exjwt({
  secret: process.env.SERVER_SECRET
});

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  db.User.findOne({
    email: req.body.email
  })
    .then(user => {
      user.verifyPassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          let token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SERVER_SECRET,
            { expiresIn: 129600 }
          ); // Sigining the token
          res.json({
            success: true,
            message: "Token Issued!",
            token: token,
            user: user
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        }
      });
    })
    .catch(err =>
      res
        .status(404)
        .json({ success: false, message: "User not found", error: err })
    );
});

// SIGNUP ROUTE
app.post("/api/signup", (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get("/api/user/:id", isAuthenticated, (req, res) => {
  db.User.findById(req.params.id)
    .populate("items")
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "No user found" });
      }
    })
    .catch(err => res.status(400).send(err));
});

// update the user data with image
app.put("/api/userimage/:id", isAuthenticated, (req, res) => {
  // console.log(req.body)
  db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(data => {
      res.json(data);
    })

    .catch(err => res.status(400).json(err));
});

//POST ITEMS ROUTE
app.post("/api/additem", isAuthenticated, (req, res) => {
  db.Item.create(req.body)
    .then(dbItem => {
      console.log(req.body);
      return db.User.findOneAndUpdate(
        { _id: dbItem.user },
        {
          $push: { items: dbItem._id }
        },
        { new: true }
      );
    })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => res.status(400).json(err));
});

//DELETE ITEMS
app.post("/api/deleteitem/:id", isAuthenticated, (req, res) => {
  db.Item.deleteOne({ _id: req.params.id })
    .then(data => {
      res.send(data);
    })
    .catch(err => res.status(400).json(err));
});

//EDIT ITEMS
app.post("/api/edititem/:id", isAuthenticated, (req, res) => {
  db.Item.updateOne(
    { _id: req.params.id },
    {
      $set: {
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription
      }
    }
  ).then(dbItem => {
    console.log("Edited!");
  });
});

app.get("/api/allusers", (req, res) => {
  db.User.find({})
    .populate("items")
    .then(data => {
      res.json(data);
    })
    .catch(err => res.statusMessage(400).json(err));
});

//ROUTE FOR HOMEPAGE ITEM DISPLAY
app.get("/api/allItems", (req, res) => {
  db.Item.find({})
    .populate("user")
    .then(data => {
      res.json(data);
    })
    .catch(err => res.statusMessage(400).json(err));
});

//ROUTE FOR SEARCHING ITEMS, MATCHES
app.get("/api/filtereditems/:query", (req, res) => {
  db.Item.find({
    $or: [
      {
        itemName: { $regex: ".*" + req.params.query + ".*", $options: "i" }
      },
      {
        itemDescription: {
          $regex: ".*" + req.params.query + ".*",
          $options: "i"
        }
      }
    ]
  })
    .populate({
      path: "user"
    })
    .then(data => {
      res.json(data);
    });
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get(
  "/",
  isAuthenticated /* Using the express jwt MW here */,
  (req, res) => {
    res.send("You are authenticated"); //Sending some response when authenticated
  }
);

// Error handling
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
