const express = require("express");
const mainRouter = require("./routes/router");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);


// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword.....

// /api/v1/account/transferMoney
// /api/v1/account/balance


app.get("/", (req, res) => {
  res.json("Server is up and running");
});

app.listen(3000, () => {
  console.log("Server is running on port ");
});