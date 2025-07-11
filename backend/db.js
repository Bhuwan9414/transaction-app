const mongoose = require("mongoose")

mongoose.connect("")

const userSchema = new mongoose.Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String
})

const accountSchema = new mongoose.Schema({
    userId : String,
    balance : Number
})

const User = mongoose.model("User", userSchema)

const Account = mongoose.model("Account", accountSchema)

module.exports = {
    User,
    Account
}