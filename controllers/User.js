const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

//@desc     Register User
//@route    POST /api/v1/auth/regsiter
//@access   Public
exports.register = asyncHandler(async (req, res, next) => {
     const { username, email, password, role } = req.body;
     const user = await User.create({
          username, email, password
     });
     sendTokenResponse(user, 200, res);
})

//@desc     Login user
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
     const { email, username, password } = req.body;
     if (!password) {
          return next(new ErrorResponse("Please provide a password", 400));
     }

     if (!username && !email) {
          return next(new ErrorResponse("Please provide either an email or username", 400))
     }

     //check for user
     let user;
     if (!username) {
          user = await User.findOne({ email }).select("+password");
     } else {
          user = await User.findOne({ username }).select("+password")
     }

     if (!user) {
          return next(new ErrorResponse("Invalid Credentials", 401));
     }

     const isMatch = await user.matchPassword(password);
     if (!isMatch) {
          return next(new ErrorResponse("Invalid Credentials", 401));
     }

     sendTokenResponse(user, 200, res);
});

//@desc     Get Current User
//@route    GET /api/v1/auth/me
//@access   Private

exports.getMe = asyncHandler(async (req, res, next) => {
     const user = await User.findById(req.user.id).select("-password");
     if (!user) return res.status(404).json({ success: false, msg: "user not found" })
     res.status(200).json({ success: true, data: user });
});


//@desc     Update password
//@route    PUT /api/v1/auth/updatepassword
//@access   Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
     const user = await Account.findById(req.user.id).select("+password");

     //check current password
     if (!(await user.matchPassword(req.body.currentPassword))) {
          return next(new ErrorResponse("Password is incorrect", 401));
     }

     user.password = req.body.newPassword;

     await user.save();

     sendTokenResponse(user, 200, res);
});


//@desc     Update user details
//@route    PUT /api/v1/auth/updatedetails
//@access   Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
     const fieldsToUpdate = {
          username: req.body.name,
          email: req.body.email,
     };
     const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
          new: true,
          runValidators: true,
     });

     res.status(200).json({ success: true, data: user });
});




//get token from model, create cookie, and send response
const sendTokenResponse = (user, statusCode, res) => {

     const token = user.getSignedJwtToken();


     const options = {
          expires: new Date(
               Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
     };

     if (process.env.NODE_ENV === "production") {
          options.secure = true;
     }

     res
          .status(statusCode)
          .json({ success: true, token });
};
