const { Sequelize } = require("sequelize");
const { expenseModel, userModel, DB } = require("../models");


const addExpense = async (req, res) => {
    const transaction = await DB.transaction();
    try {
        const { Category, Description, ExpenseAmount } = req.body;
        const user = req.user;
        const { id } = user;

        if (!Category || !ExpenseAmount) {
            return res.status(400).json({
                ERROR:"Category and Expense Required"
            })
        }

       

        const userData = await userModel.findByPk(id, { transaction });

        let total = Number(userData.Total_Expense) + Number(ExpenseAmount);

        userData.Total_Expense = total;

        await userData.save({ transaction });
      
        const newExpense = await expenseModel.create(
          {
            Category,
            Description,
            ExpenseAmount,
            UserId: id,
          },
          { transaction }
        );

         await transaction.commit();

        res.status(201).json({
            Message: "Expense Added",
            result:newExpense
        })

    }
    catch (err) {
         await transaction.rollback();
        res.status(500).json({
            ERROR:err.message
        })
    }
}



const getExpense = async (req, res) => {
    try {
      const user = req.user;
      const { id } = user;
      let { page=1, limit=10 } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
      const OFFSET = (page - 1) * limit;
      
      
        const { count, rows:expense } = await expenseModel.findAndCountAll({
          where: { UserId: id },
          include: [
            {
              model: userModel,
              attributes: ["id", "name", "email", "photoUrl"],
            },
          ],
          limit: limit,
          offset: OFFSET,
          order: [["createdAt", "DESC"]],
        });

       
        
        const totalPages = Math.ceil(count / limit);
        
        //  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
        //    req.path
        //      }`;

        const baseUrl = `https://expensetrack.space/api/${req.path}`;
        
        const nextPage =
          page < totalPages
            ? `${baseUrl}?page=${page + 1}&limit=${limit}`
            : null;

        const previousPage =
          page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;
    
        res.status(200).json({
          count: expense.length,
          currentPage: page,
          pageSize: limit,
          nextPage,
          previousPage,
          results: expense,
        });

    }
    catch (err) {
     res.status(500).json({
     ERROR: err.message,
   });
 }
 };



const updateExpense = async (req, res) => {
    try {
     

    }
    catch (err) {
     res.status(500).json({
     ERROR: err.message,
   });
 }
 };


const deleteExpense = async (req, res) => { 
    try {

     const user = req.user;
     const { id } = user;
     const { Id } = req.params;

     const expenseItem=await expenseModel.findByPk(Id)
     
        if (!expenseItem) {
            return res.status(400).json({
                ERROR:`Expense with id ${Id} not found`
            })
        }

        const deleteExpense = await expenseModel.destroy({
            where: {
                id: Id,
                UserId:id
            }
        })

        res.status(200).json({
            message: "Expense Deleted",
            Data:deleteExpense
        })




    }
    catch (err) {
      res.status(500).json({
     ERROR: err.message,
   });
 }
};


module.exports = { addExpense, getExpense, updateExpense, deleteExpense };