const { chatModel, userModel, messageModel,promptResponseModel } = require("../models");
const { Op, Sequelize } = require("sequelize");
const { GoogleGenAI } = require("@google/genai");


const addMessageAI = async (req, res) => {
    try {
        const { prompt } = req.body;
          if (!prompt) {
            return res.status(400).json({ ERROR: "Prompt is required" });
          }
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
         let response;
         try {
           response = await ai.models.generateContent({
             model: "gemini-2.5-flash",
             contents: `I am Chatting with someone on my WhatsApp so Give me a Good and meaningfull Reply, answer, question or a counterback for this message in just 2-3 lines or less -> ${prompt}`,
           });
         } catch (apiError) {
           if (apiError.message.includes("503")) {
             return res.status(503).json({
               ERROR: "Gemini model is overloaded. Please try again later.",
             });
           }

           throw apiError; // rethrow other errors
         }

         const aiText =
           response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
           response?.text ||
             "No response generated.";
        
         res.status(201).json({
           message: "Prompt saved",
           result: aiText,
         });
        
    }
    catch (err) {
        res.status(500).json({
          ERROR: err.message,
        });
    }
}




const addMySocketChats = async ({ input, userId, selectedContact }) => {
  try {
   
   
    const sender = userId;
    const reciver = selectedContact;
    const message=input

    const findChat = await chatModel.findOne({
      where: {
        [Op.or]: [
          { User_1: sender, User_2: reciver },
          { User_1: reciver, User_2: sender },
        ],
      },
    });

    if (!findChat) {
      const createChat = await chatModel.create({
        User_1: sender,
        User_2: reciver,
      });

      const createMessage = await messageModel.create({
        chatId: createChat.id,
        Sender_id: sender,
        Message: message,
      });

      const getChat = await chatModel.findAll({
        where: {
          [Op.or]: [
            { User_1: sender, User_2: reciver },
            { User_1: reciver, User_2: sender },
          ],
        },
        include: [
          {
            model: messageModel,
            attributes: ["Message", "Sender_id", "createdAt"],
          },
          {
            model: userModel,
            as: "User1", // <- FIRST USER
            attributes: ["name", "photoUrl", "id"],
          },
          {
            model: userModel,
            as: "User2", // <- SECOND USER
            attributes: ["name", "photoUrl", "id"],
          },
        ],

        order: [[Sequelize.literal("createdAt"), "DESC"]],
      });

        return;
    }

    const createMessage = await messageModel.create({
      chatId: findChat.id,
      Sender_id: sender,
      Message: message,
    });

    const getChat = await chatModel.findAll({
      where: {
        [Op.or]: [
          { User_1: sender, User_2: reciver },
          { User_1: reciver, User_2: sender },
        ],
      },
      include: [
        {
          model: messageModel,
          attributes: ["Message", "Sender_id", "createdAt"],
        },
        {
          model: userModel,
          as: "User1", // <- FIRST USER
          attributes: ["name", "photoUrl", "id"],
        },
        {
          model: userModel,
          as: "User2", // <- SECOND USER
          attributes: ["name", "photoUrl", "id"],
        },
      ],

      order: [[Sequelize.literal("createdAt"), "DESC"]],
    });

      return;
  } catch (err) {
      return err;
  }
};



const getChats = async (req, res) => {
    try {
        const { otherUserId } = req.query;
        const { id } = req.user
        
        const getChat = await chatModel.findAll({
          where: {
            [Op.or]: [
              { User_1: id, User_2: otherUserId },
              { User_1: otherUserId, User_2: id },
            ],
          },
          include: [
            {
              model: messageModel,
              attributes: ["Message", "Sender_id", "createdAt"],
            },
            {
              model: userModel,
              as: "User1", // <- FIRST USER
              attributes: ["name", "photoUrl", "id"],
            },
            {
              model: userModel,
              as: "User2", // <- SECOND USER
              attributes: ["name", "photoUrl", "id"],
            },
          ],

          order: [[Sequelize.literal("createdAt"), "DESC"]],
        });

         res.status(201).json({
          result: getChat,
        });
    }
    catch (err) {
         res.status(500).json({
           ERROR: err.message,
         });
    }
}


module.exports = { addMessageAI, getChats, addMySocketChats };