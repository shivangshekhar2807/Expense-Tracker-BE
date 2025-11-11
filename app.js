const express = require("express");
const app = express();
require("dotenv").config();
const DB = require("./database/DBconnect");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const userAuthRouter = require("./routes/userAuth");
const profileRouter = require("./routes/profile");

    (async () => {
        try {
            await DB.authenticate();
            console.log("DB authenticated");

            await DB.sync();
            console.log("DB Synced");

            app.listen(8000, () => {
                console.log("Server Listening on PORT 8000")
            })
 
        }
        catch (err) {
            console.log(err)
        }
    })();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());



app.use("/", userAuthRouter);
app.use("/", profileRouter);