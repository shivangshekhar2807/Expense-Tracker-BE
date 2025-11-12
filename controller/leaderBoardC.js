const { Sequelize } = require("sequelize")
const { expenseModel, userModel } = require("../models")


const getLeaderBoard = async (req, res) => {

    try {


        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const OFFSET = (page - 1) * limit;

       const { count, rows: leaderBoard } = await expenseModel.findAndCountAll({
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
         limit: limit,
         offset: OFFSET,
         order: [[Sequelize.literal("Total_Expense"), "DESC"]],
         raw: true,
       });
        
        const totalPages = Math.ceil(count / limit);

        const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
          req.path
        }`;

        const nextPage =
          page < totalPages
            ? `${baseUrl}?page=${page + 1}&limit=${limit}`
            : null;

        const previousPage =
          page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;
        
        res.status(200).json({
          count: leaderBoard.length,
          currentPage: page,
          pageSize: limit,
          nextPage,
          previousPage,
          result: leaderBoard,
        });
    }
    catch (err) {
        res.status(500).json({
            ERROR:err.message
        })
    }
    
}

module.exports={getLeaderBoard}