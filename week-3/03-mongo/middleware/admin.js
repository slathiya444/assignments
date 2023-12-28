const { Admin } = require("../db");
const { User } = require("../db")
// Middleware for handling auth
async function adminMiddleware(req, res, next) {

    console.log("-----------------------------------")
    console.log("Authentication Started......")
    console.log("-----------------------------------")

    const { username, password } = req.headers;
    console.log(username)

    try{
        const user = await User.find({ username, password });
        console.log(user)

        if (!user){
            return res.status(401).json({msg: "You are Not authenticated! Please try again"});
        };
        req.authenticatedAdmin = user;
        console.log("-----------------------------------")
        console.log("Authentication Done!")
        console.log("-----------------------------------")
        next();
        } 
    catch(e){
        console.error("Error occured during Admin authentication", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = adminMiddleware;