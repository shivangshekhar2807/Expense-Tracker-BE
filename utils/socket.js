const socket = require("socket.io");
const { addChats, addMySocketChats } = require("../controller/chatC");



const initializeSocket = async (server) => {
     const io = socket(server, {
       cors: {
         origin: "http://localhost:5173",
       },
     });
    
    //------------------------------------------------------------------------------------------------
  
    
    io.on("connection", (socket) => {


        socket.on("joinChat", ({ userId, selectedContact }) => {

            const room = [userId, selectedContact].sort().join("_");
            console.log("roooooom",room)
            socket.join(room)
        });

        //------------------------------------------------------------------------------------------------
        

        
        socket.on("sendMessage",async({ input, userId, selectedContact }) => {
            const room = [userId, selectedContact].sort().join("_");
            console.log(input, userId, selectedContact);
            const saved = await addMySocketChats({ input, userId, selectedContact });
            console.log(saved)
            io.to(room).emit("receivedMessage", { input, userId });

        });



        //------------------------------------------------------------------------------------------------
        

        socket.on("disconnect", () => {
             

         });

    })
}

module.exports = initializeSocket;