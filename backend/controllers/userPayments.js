const account = require("../models/account");
const user = require("../models/user");

exports.findUser = async (req, res) => {
  try {
    const { searchUser } = req.query;
    console.log("searchUser", searchUser);

    const findUser = await user
      .find({
        $or: [
          { phoneNumber: { $regex: `^${searchUser}`, $options: "i" } }, // case-insensitive
          { email: { $regex: `^${searchUser}`, $options: "i" } },
        ],
      })
      .select("-password -account")
      .populate({
        path: "account",
        select: "-_id balance",
      });

    // console.log(findUser);
    if (!findUser) {
      return res.status(404).json({
        message: "No user found with this number",
      });
    }

    return res.status(200).json({
      message: "User by number",
      data: findUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while finding user",
      success: false,
      error: error,
    });
  }
};

exports.pay = async (req, res) => {
  try {
    const { amount, transactionMsg, UserReceiver } = req.body;
    const id = req.userId;
 
    if (!amount || !UserReceiver) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    const findUserReceiver = await user.findById(UserReceiver);
    if (!findUserReceiver) {
      return res.status(404).json({
        message: "Unable to find receiver user",
        success: false,
      });
    }

    const userPayer = await user.findById(id);
    if (!userPayer) {
      return res.status(404).json({
        message: "Unable to find payer user",
        success: false,
      });
    }

    //find balance account
    const findPayerBalanceAcco = await account.findOne({ userId: id });

    if (!findPayerBalanceAcco) {
      return res.status(404).json({
        message: "Payer account not found",
        success: false,
      });
    }

    const findrReceiverBalAcco = await account.findOne({
      userId: UserReceiver,
    });

    if (!findrReceiverBalAcco) {
      return res.status(404).json({
        message: "reciever balance account not found",
      });
    }

    if (findPayerBalanceAcco.balance < amount) {
      return res.status(404).json({
        message: "Payer user has insufficient balance",
        success: false,
      });
    }

    findPayerBalanceAcco.balance -= amount;
    findrReceiverBalAcco.balance += amount;

    userPayer.yourTransaction.push({
      type: "Debit", 
      to: findUserReceiver._id,
      amount,
      message:transactionMsg
    });

    findUserReceiver.yourTransaction.push({
      type: "Credit",
      from: userPayer._id,
      amount,
      message:transactionMsg
    });

    await findPayerBalanceAcco.save();
    await findrReceiverBalAcco.save();
    await userPayer.save({ validateBeforeSave: false });
    await findUserReceiver.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Amount sent successfully",
      success: true,
      transactionMsg: transactionMsg,
      balance: findPayerBalanceAcco.balance,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Server error while sending money",
      success: false,
    });
  }
};
