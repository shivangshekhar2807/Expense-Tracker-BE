const express = require("express");
const helmet = require("helmet");
const app = express();

require("dotenv").config();
// const DB = require("./database/DBconnect");
const {DB}=require("./models")
const cookieparser = require("cookie-parser");
const cors = require("cors");
const http=require("http")
const userAuthRouter = require("./routes/userAuth");
const profileRouter = require("./routes/profile");
const expenseRouter = require("./routes/expense");
const leaderBoardRouter = require("./routes/leaderBoard");
const reportRouter = require("./routes/report");
const aiRouter = require("./routes/chatWithAI");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const ChatRouter = require("./routes/chatApp");

const server = http.createServer(app);
initializeSocket(server);

    (async () => {
        try {
            await DB.authenticate();
            console.log("DB authenticated");

            await DB.sync();
            console.log("DB Synced");

            server.listen(process.env.SERVER_PORT, () => {
              console.log("Server Listening on PORT 6666");
            });
 
        }
        catch (err) {
            console.log(err)
        }
    })();

app.use(helmet());

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
app.use("/", expenseRouter);
app.use("/", leaderBoardRouter);
app.use("/", reportRouter);
app.use("/", aiRouter);
app.use("/", paymentRouter);
app.use("/", ChatRouter);