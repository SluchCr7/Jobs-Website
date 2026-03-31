const { User, LoginValidate, ValidateUser } = require("../Modules/User")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = asyncHandler(async (req, res) => {
  // 1. Validate input
  const { error } = LoginValidate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // 2. Find user with password + populate company
  const userExist = await User.findOne({ email: req.body.email })
    .select("+password")
    .populate({
      path: "company",
      select: "name logo",
    });

  if (!userExist) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // 3. Check password
  const validPassword = await bcrypt.compare(req.body.password, userExist.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // 4. Create JWT token
  const token = jwt.sign(
    { id: userExist._id, role: userExist.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // 5. Return user without password
  const { password, ...others } = userExist._doc;

  return res.status(200).json({
    message: "Login successful",
    user: {
      ...others,
      token,
    },
    token,
  });
});

const signUp = asyncHandler(async (req, res) => {
  // 1. Validate
  const { error } = ValidateUser(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  // 2. Check if exists
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) {
    return res.status(400).json({ message: "Email already exists" })
  }

  // 3. Hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  // 4. Generate OTP
  const verificationOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationOTPExpire = new Date(Date.now() + 30 * 60 * 1000);

  // 5. Create User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    role: req.body.role || "user",
    verificationOTP,
    verificationOTPExpire
  })

  await user.save()

  // 6. Generate Token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const { password: pass, ...others } = user._doc;

  // Mock send email
  console.log(`[VERIFICATION] Email: ${user.email}, OTP: ${verificationOTP}`);

  return res.status(201).json({
    message: "Account created successfully. Please verify your email.",
    user: { ...others, token },
    token
  });
})

const verifyEmail = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.isVerified) return res.status(400).json({ message: "Email already verified" });

  if (user.verificationOTP !== otp || user.verificationOTPExpire < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.verificationOTP = undefined;
  user.verificationOTPExpire = undefined;
  await user.save();

  res.status(200).json({ message: "Email verified successfully" });
});

const resendOTP = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationOTP = otp;
  user.verificationOTPExpire = new Date(Date.now() + 30 * 60 * 1000);
  await user.save();

  console.log(`[VERIFICATION] Resent OTP to ${user.email}: ${otp}`);
  res.status(200).json({ message: "OTP resent successfully" });
});

const oauthCallback = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
  res.redirect(`${clientUrl}/oauth-success?token=${token}`);
};

module.exports = { signUp, login, oauthCallback, verifyEmail, resendOTP }