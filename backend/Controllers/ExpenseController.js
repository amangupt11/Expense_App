import UserModel from '../Models/User.js';

export const addTransaction = async (req, res) => {
    const { _id } = req.user;

    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $push: { expenses: req.body } },
            { new: true }
        );

        res.status(200).json({
            message: "Expense added successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong.",
            error: err,
            success: false
        });
    }
};

export const getAllTransactions = async (req, res) => {
    const { _id } = req.user;

    try {
        const userData = await UserModel.findById(_id).select('expenses');

        res.status(200).json({
            message: "Fetched Expenses successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};

export const deleteTransaction = async (req, res) => {
    const { _id } = req.user;
    const { expenseId } = req.params;

    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { expenses: { _id: expenseId } } },
            { new: true }
        );

        res.status(200).json({
            message: "Expense Deleted successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};
