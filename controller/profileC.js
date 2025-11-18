const { userModel, chatModel } = require("../models");
const { Op } = require("sequelize");

const getProfile = async (req, res) => {
    try {

        const user = req.user
        
         if (!user) {
           throw new Error("NO USER FOUND");
         }

         res.status(200).json({
           status: "User Profile",
           Data: user,
         });
        
    }
    catch (err) {
       
    res.status(500).json({ ERROR: err.message });
    }
}


const getConnectedUsers = async (id) => {
  const chats = await chatModel.findAll({
    where: {
      [Op.or]: [{ User_1: id }, { User_2: id }],
    },
  });

  // Return array of unique connected user IDs
  return [
    ...new Set(
      chats.map((chat) => (chat.User_1 === id ? chat.User_2 : chat.User_1))
    ),
  ];
};



const getAllContacts = async (req, res) => {
    try {

           const { type } = req.query;
           const { id } = req.user;
         const connectedUserIds = await getConnectedUsers(id);

         let result;

         // --------------------- MY CONTACTS ----------------------
         if (type === "myContacts") {
           result = await userModel.findAll({
             where: {
               id: {
                 [Op.in]: connectedUserIds,
               },
             },
           });
         }

         // --------------------- ALL CONTACTS ----------------------
         else if (type === "allContacts") {
           result = await userModel.findAll({
             where: {
               id: {
                 [Op.notIn]: [...connectedUserIds, id], // exclude me + connected users
               },
             },
           });
         }

         return res.status(200).json({
           count: result.length,
           result,
         });

    }
    catch (err) {
        res.status(500).json({ ERROR: err.message });
    }
}



const updateProfile = async (req, res) => {
    try {
        const allowedFields = ["name", "phone", "photoUrl"];

        const { id } = req.user;

       if (
         Object.keys(req.body).some((item) => !allowedFields.includes(item))
       ) {
         return res
           .status(400)
           .json({ ERROR: "Invalid fields in request body" });
       }

     await userModel.update(req.body, { where: { id } });

     
     const updatedUser = await userModel.findOne({ where: { id } });

     return res.status(200).json({
       message: "Profile updated successfully",
       data: updatedUser,
     });
       
       
    }
    catch (err) {
         res.status(500).json({ ERROR: err.message });
    }
}


module.exports = { getProfile, updateProfile, getAllContacts };