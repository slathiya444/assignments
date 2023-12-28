const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Middleware for handling auth

    const { username, password } = req.headers;

    try{
        const user = await User.findOne({username, password});

        if (!user){
            return res.status(401).json({msg: "You are Not authenticated! Please try again"});
        };
        req.authenticatedUser = user;
        next();
        } 
    catch(e){
        console.error("Error occured during Admin authentication", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = userMiddleware;