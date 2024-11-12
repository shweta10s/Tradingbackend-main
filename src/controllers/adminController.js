const User = require('../model/LiveAccountSchema');

// Approve User for Trading
const approveUser = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user) {
        user.isApproved = true;
        user.canTrade = true;
        await user.save();
        res.json({ message: 'User approved for trading' });
    } else {
        res.status(404);
        return res.status(400).send('User not found');
    }
};

// Reject User
const rejectUser = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user) {
        user.isApproved = false;
        user.canTrade = false;
        await user.save();
        res.json({ message: 'User rejected for trading' });
    } else {
        res.status(404);
        return res.status(400).send('User not found');
    }
};


// Approve User's Entry Payment
const approvePayment = async (req, res) => {
    const { userId } = req.params; // ID of the user whose payment is being approved
    const { amount, transactionId } = req.body; // Amount paid and Transaction ID

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields for amount and transaction ID
        user.amount = amount; // Set the amount paid by the user
        user.transactionId = transactionId; // Record the transaction ID
        user.isApproved = true; // Approve the user for trading
        user.canTrade = true; // Mark the user as eligible for trading

        await user.save(); // Save the updated user to the database

        res.json({
            message: 'User payment approved and trading enabled',
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const userData = async(req, res)=>{
    try{
        const userdata = req.user; 
        return res.status(200).json({userdata});
    }catch(e){
        console.log("error from adminController router",e);
        
    }
}

module.exports = { approveUser, rejectUser, approvePayment, userData };
