const { User, UpdateUserValidate } = require("../Modules/User")
const asyncHandler = require("express-async-handler")
const { cloudUpload, cloudRemove } = require("../config/cloudUpload");

// Get current user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate({
      path: "company",
      populate: [
        { path: "owner", select: "name email avatar" },
        { path: "members.user", select: "name email avatar" }
      ]
    });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};


/**
 * @desc    Update user avatar
 * @route   PUT /api/users/avatar
 * @access  Private
 */
const updateUserAvatar = asyncHandler(async (req, res) => {
  // 1. Check file
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  // 2. Get user
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 3. Remove old avatar if exists
  if (user.avatar?.publicId) {
    await cloudRemove(user.avatar.publicId);
  }

  // 4. Upload new avatar
  const uploadResult = await cloudUpload(req.file);

  // 5. Update user avatar
  user.avatar = {
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };

  await user.save();

  res.status(200).json({
    message: "Avatar updated successfully",
    avatar: user.avatar,
  });
});


const updateUserProfile = async (req, res) => {
  // 1. Validate input
  const { error } = UpdateUserValidate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // 2. Find user
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // 3. Prepare update object dynamically
  const updateData = {};
  const { name, email, bio, avatar, resume, password } = req.body;

  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (bio !== undefined) updateData.bio = bio;

  // 4. Update user
  const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: updateData }, { new: true }).select("-password");

  // 5. Return response
  res.status(200).json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
};


// Admin: get all users
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).json({ message: "User Not Found" })
  }
  res.json(user);
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ message: "User Not Exist" })
  else {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: 'User Deleted Successfully' })
  }
})



module.exports = { deleteUser, getUserById, getAllUsers, updateUserProfile, getUserProfile, updateUserAvatar }