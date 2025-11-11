

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


module.exports={getProfile}