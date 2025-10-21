const Expense = require('../models/Expense');

exports.getMonthlyReports = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { month, year } = req.query;
    if (!month || !year) {
      return res.status(400).json({ message: 'Month and year query params required' });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const result = await Expense.aggregate([
      { $match: { userId, date: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: null,
          categories: {
            $push: {k: '$_id',v: '$totalAmount'},
          },
          total: { $sum: '$totalAmount' },
        },
      },
      {
        $project: {
          _id: 0,total: 1,categories: { $arrayToObject: '$categories' }
        }
      }
    ]);

    res.status(200).json(result[0] || { total: 0, categories: {} });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monthly report', error: error.message });
  }
};

exports.getCategoryReports = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: 'Category query param required' });
    }

    const expenses = await Expense.find({ userId, category }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category report', error: error.message });
  }
};
