const {GoogleGenAI}=require("@google/genai");
const { promptResponseModel, userModel } = require("../models");
const { use } = require("react");

const addChatAi = async (req, res) => {
    try {
        const { prompt } = req.body;
        const { id } = req.user;

        const user = await userModel.findByPk(id);

        const balance = user.Wallet_Balance;

        if (balance <= 0) {
            return res.status(400).json({ ERROR: "Insufficient Ballance. Please Recharge!!!" });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        if (!prompt) {
          return res.status(400).json({ ERROR: "Prompt is required" });
        }
       
           let response;
           try {
             response = await ai.models.generateContent({
               model: "gemini-2.5-flash",
               contents: prompt,
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
        
        // const newPrompt = await promptResponseModel.create({
        //   Prompt: prompt,
        //   Response: response.text,
        //   UserId:id
        // });

       const time= await promptResponseModel.create({
          Prompt: prompt,
          Response: aiText,
          UserId: id,
        });

           
            // res.status(201).json({
            //     message:"prompt saved",
            //   result: response.text,
        // });
        
        user.Wallet_Balance -= -1;

        await user.save();
        
         res.status(201).json({
           message: "Prompt saved",
           result: aiText,
           createdAt:time.createdAt
         });
       
    }
    catch (err) {
        res.status(500).json({
            ERROR:err.message
        })
    }
    
}





const getChatAi = async (req, res) => {
    try {
        const { id } = req.user;

        const response = await promptResponseModel.findAll({
          where: {
            UserId: id,
          },
          order: [["createdAt", "ASC"]],
        });

        res.status(200).json({
            count: response.length,
            result:response
        })

    }
    catch (err) {
          res.status(500).json({
            ERROR: err.message,
          });
    }
}

module.exports = { addChatAi, getChatAi };