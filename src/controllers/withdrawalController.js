const User = require('../model/LiveAccountSchema');

// Request Withdrawal
const requestWithdrawal = async (req, res) => {
    const { amount } = req.body;
    const user = await User.findById(req.user._id);

    if (user && user.amount >= amount) {
        user.amount -= amount;
        await user.save();
        res.json({ message: 'Withdrawal request submitted', remainingAmount: user.amount });
    } else {
        res.status(400);
        return res.status(400).json({val:'Insufficient funds' , data:user.amount});
    }
};


// Admin Approves Withdrawal
const approveWithdrawal = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
    const user = await User.findById(userId);

    if (user && user.amount >= amount) {
        // Logic to process refund
        // user.amount -= amount;
        await user.save();
        res.json({ message: 'Withdrawal approved and processed' });
    } else {
        res.status(400);
        return res.status(400).send('Insufficient funds or invalid user');
    }
};

module.exports = { requestWithdrawal, approveWithdrawal };
