const { Op } = require("sequelize");
const { expenseModel } = require("../models");

const getReport = async (req, res) => {
  try {
    const { id } = req.user;
    const { date, month, year } = req.query;

    // Ensure at least one param is provided
    if (!date && !month && !year) {
      return res.status(400).json({
        success: false,
        message: "Please provide a date, month, or year query parameter.",
      });
    }

    let startDate, endDate;

    // 🗓️ 1️⃣ Specific Date
    if (date) {
      const target = new Date(date);
      startDate = new Date(target.setHours(0, 0, 0, 0));
      endDate = new Date(target.setHours(23, 59, 59, 999));
    }

    // 📅 2️⃣ Specific Month (use current year if not provided)
    else if (month) {
      const targetYear = year ? parseInt(year) : new Date().getFullYear();
      const targetMonth = parseInt(month) - 1; // JS months are 0-based
      startDate = new Date(targetYear, targetMonth, 1);
      endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);
    }

    // 📆 3️⃣ Specific Year
    else if (year) {
      const targetYear = parseInt(year);
      startDate = new Date(targetYear, 0, 1);
      endDate = new Date(targetYear, 11, 31, 23, 59, 59);
    }

    // 🔍 Fetch filtered data
    const report = await expenseModel.findAll({
      where: {
        UserId: id,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    // 💰 Calculate total expense
    const totalExpense = report.reduce(
      (sum, expense) => sum + parseFloat(expense.ExpenseAmount),
      0
    );

    // ✅ Response
    res.status(200).json({
      success: true,
      filter: date
        ? `date: ${date}`
        : month
        ? `month: ${month}${year ? `, year: ${year}` : ""}`
        : `year: ${year}`,
      meta: {
        userId: id,
        totalRecords: report.length,
        totalExpense: totalExpense.toFixed(2),
        period: {
          start: startDate,
          end: endDate,
        },
      },
      data: report,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to generate expense report",
      error: err.message,
    });
  }
};

module.exports = { getReport };
