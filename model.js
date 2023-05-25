const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


// ***call to token in server.js***/
userschema.methods.generatetoken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, "thisissecretkey");
        this.tokens = this.tokens.concat({ token, token })
        console.log("this is regst");
        await this.save();
        return token;
    } catch (e) {
        console.log("this is erroro part ", e);
        res.send("the error part" + e);
    }
}

///call to add data gross and net


module.exports = mongoose.model("coins", userschema);