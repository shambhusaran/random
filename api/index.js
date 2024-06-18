const express = require("express");
const mongoose = require("mongoose");
const { config } = require("dotenv");

const router = require("./routes");
config();
const app = express();
app.use(express.json()); ////middleware to recognize json data from req.body

app.use("/api", router);

app.use(({ req, res, next }) => {
  //when an api is hit and there is no route
  //then this middlewarwe will run indicatino that the resourvce you are tyring to access
  //is not there
  
  return next({
    message: "resource not found",
    status: 404,
  });
});

app.use((err, req, resp, next) => {
  //this middleware runs if any error occurs inthe server

  resp.status(err.status || 500);
  console.log(err)
  resp.send({
    message: err.message || "Server Error",
    errors: err.errors,
  });
});

app.listen(process.env.PORT, async () => {
  //app is listening on port 5000 and connected with mongodb database
  console.log(
    `Server is running on port http://localhost:${process.env.PORT} `
  );
  console.log("Press ctrl + C to stop the server .............");
  await mongoose.connect(process.env.MONGO_URL);
});

//app.use(express.urlencoded());
// app.get('/contact', (req, resp)=>{
//     resp.send({
//         method: req.method,
//         url: req.url
//     })
// });

// app.get('/home/:id', (req, resp, next)=>{
//     if (req.params.id == 0) next('route')
//     else next()

// }, (req, resp, next)=>{
//     resp.send("regular")
// })

// app.get('/home/:id', (req,resp,next)=>{

//     resp.send("special")
// })

//app.use('/',router);
