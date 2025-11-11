const express = require("express");
const app = express();
require("dotenv").config();
const DB = require("./database/DBconnect");
const cookieparser = require("cookie-parser");
const userAuthRouter = require("./routes/userAuth");

    (async () => {
        try {
            await DB.authenticate();
            console.log("DB authenticated");

            await DB.sync({ alter: true });
            console.log("DB Synced");

            app.listen(8000, () => {
                console.log("Server Listening on PORT 8000")
            })
 
        }
        catch (err) {
            console.log(err)
        }
    })();



app.use(express.json());
app.use(cookieparser());



app.use("/", userAuthRouter);