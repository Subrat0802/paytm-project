const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {z} = require("zod");
const account = require("../models/account");

dotenv.config();

const signUpZod = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
  .number()
  .transform(val => val.toString())
  .refine(val => /^\d{10}$/.test(val), {
    message: "Invalid mobile number",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

exports.signup = async (req, res) => {
  try {
    // const data = req.body;
    // console.log(data.firstName, data.lastName, data.email, data.phoneNumber, data.password);
    
    const parsed = signUpZod.safeParse(req.body)

    if(!parsed.success){
      return res.status(401).json({
        message:"Zod validation error",
        errors:parsed.error.issues[0].message
      })
    }

    const { firstName, lastName, email, phoneNumber, password } = parsed.data;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(404).json({
        message: "All fields are required",
      });
    }
    const checkUser = await user.findOne({ email: email });

    if (checkUser) {
      return res.status(404).json({
        message: "User already signup, please signin.",
      });
    }

    const checkNumber = await user.findOne({phoneNumber:phoneNumber})

    if(checkNumber){
      return res.status(404).json({
        message: "Phone number is already register with other user",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await user.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashPassword,
    });

    if (!createUser) {
      return res.status(409).json({
        message: "Error while signup",
      });
    }

    const addRandomBalance = await account.create({
      userId: createUser._id,
      balance: 1 + Math.random() * 10000
    })

    if(!addRandomBalance){
      return res.status(404).json({
        message:"Error while adding reward balance to your account"
      })
    }

    createUser.account = addRandomBalance._id;
    await createUser.save();

    createUser.password = undefined;

    res.status(200).json({
      message: "User signed up successfully",
      data: createUser,
      balance:addRandomBalance
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "Server error while signup",
      data: error,
    });
  }
};


const signInZod = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

exports.signin = async (req, res) => {
  try {

    const parsed = signInZod.safeParse(req.body)

    if(!parsed.success){
      return res.status(401).json({
        message:"Zod validation error",
        errors:parsed.error.errors
      })
    }

    const { email, password } = parsed.data;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fileds are required",
      });
    }
    const userSignin = await user.findOne({ email: email });
    if (!userSignin) {
      return res.status(404).json({
        message: "Invalid user, please signup first",
      });
    }
    const checkPassword = await bcrypt.compare(password, userSignin.password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: userSignin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    userSignin.password = undefined;

    return res.status(200).json({
      message: "User signin successfully",
      data: userSignin,
      token: token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error please try again",
      error: error,
    });
  }
};



const updateUserZod = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  password: z.string().min(6).optional(),
});

exports.updateUser = async (req, res) => {
  try {
    const parsed = updateUserZod.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Zod validation error",
        errors: parsed.error.errors,
      });
    }

    const { firstName, lastName, password } = parsed.data;
    const id = req.userId;

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await user.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Error while updating user details, try again",
      });
    }

    updatedUser.password = undefined;

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while updating user",
      error,
    });
  }
};


exports.getUser = async (req, res) => {
  try{
    const id = req.userId;
    const userData = await user.findById(id).select("-password").populate("account");
    if(!userData){
      return res.status(404).json({
        message:"Invalid user, error while getting user",
        success:false
      })
    }

    return res.status(200).json({
      user:userData,
      message:"User data",
      success:true
    })
  }catch(error){
    return res.status(500).json({
      message:"Server error while getting user",
      success:false,
      error
    })
  }
}