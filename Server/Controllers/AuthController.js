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
      select: "-createdAt name logo",
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
      token, // للفرونت
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

  // 4. Create User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    role: req.body.role || "user", // Default to user if not provided
    // Avatar has default in schema
  })

  await user.save()

  // 5. Generate Token immediately
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const { password, ...others } = user._doc;

  return res.status(201).json({
    message: "Account created successfully",
    user: { ...others, token },
    token
  });
})

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


module.exports = { signUp, login, oauthCallback }