const { Sequelize } = require("sequelize")
const { expenseModel, userModel } = require("../models")


const getLeaderBoard = async (req, res) => {

    try {
       const leaderBoard = await expenseModel.findAll({
         attributes: [
           "UserId",
           [
             Sequelize.fn("SUM", Sequelize.col("Expenses.ExpenseAmount")),
             "Total_Expense",
           ],
           [
             Sequelize.fn("COUNT", Sequelize.col("Expenses.id")),
             "Number_of_Expense",
           ],
         ],
         include: [
           {
             model: userModel,
             attributes: ["name", "photoUrl"],
           },
         ],
         group: ["UserId", "User.id"],
         order: [[Sequelize.literal("Total_Expense"), "DESC"]],
         raw: true,
       });
        
        res.status(200).json({
            count: leaderBoard.length,
            result:leaderBoard
        })
    }
    catch (err) {
        res.status(500).json({
            ERROR:err.message
        })
    }
    
}

module.exports={getLeaderBoard}