const { expenseModel, userModel } = require("../models");


const addExpense = async (req, res) => {
    try {
        const { Category, Description, ExpenseAmount } = req.body;
        const user = req.user;
        const { id } = user;

        if (!Category || !ExpenseAmount) {
            return res.status(400).json({
                ERROR:"Category and Expense Required"
            })
        }
      
        const newExpense = await expenseModel.create({
          Category,
          Description,
          ExpenseAmount,
          UserId:id
        });

        res.status(201).json({
            Message: "Expense Added",
            result:newExpense
        })

    }
    catch (err) {
        res.status(500).json({
            ERROR:err.message
        })
    }
}



const getExpense = async (req, res) => {
    try {
      const user = req.user;
      const { id } = user;
      
        const expense = await expenseModel.findAll({
          where: { UserId: id },
          include: [
            {
              model: userModel,
              attributes: ["id", "name", "email", "photoUrl"],
            },
          ],
        });
        
    
        res.status(200).json({
            count:expense.length,
            results:expense
        })

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