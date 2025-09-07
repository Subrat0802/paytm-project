const user = require("../models/user");

exports.findUser = async (req, res) => {
  try {
    const { searchUser } = req.body;
    if (!userByNumber) {
      return res.status(404).json({
        message: "No user found",
      });
    }

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
