import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";

// returns access token and refresh token
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken(); 
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken; 
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, `Something went wrong while generating tokens`);
  }
};

const getAllUsersDetails = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, users, "All users details fetched successfully"));
  } catch (error) {
    throw new ApiError(500, `Error fetching users details: ${error.message}`);
  }
});

const registerUser = asyncHandler(async (req, resp) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((fields) => fields.trim() === "")) {
    throw new ApiError(400, `All fields are required`);
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(
      409,
      `User with the same username or email already exists`
    );
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  // removes password from user object before sending response
  const createdUser = await User.findById(user._id).select("--password");

  return resp
    .status(201)
    .json(new ApiResponse(200, createdUser, `User Register Successfully`));
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      throw new ApiError(400, `Username and password are required`);
    }
  
    const user = await User.findOne({ username });
  
    if (!user) {
      throw new ApiError(400, `User does not exist`);
    }
  
    const isPasswordCorrect = await user.isPasswordCorrect(password);
  
    if (!isPasswordCorrect) {
      throw new ApiError(401, `Invalid password`);
    }
  
    const { accessToken, refreshToken } = await generateTokens(user._id);
  
    const userInfo = await User.findById(user._id).select("-password");
  
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: userInfo,
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        `User logged in successfully`
      )
    );
  });
  
  const updateUserDetails = asyncHandler(async (req, res) => {
    const userId = req.params.userId;  
    const { avatar, coverImage, bio, links, location } = req.body;
  
    let user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    if (avatar) user.avatar = avatar;
    if (coverImage) user.coverImage = coverImage;
    if (bio) user.bio = bio;
  
    if (links) {
      if (links.length > 3) {
        throw new ApiError(400, "Maximum 3 links allowed");
      } else {
        user.links = links;
      }
    }
  
    if (location) user.location = location; 
  
    user = await user.save();
  
    return res.status(200).json(
      new ApiResponse(200, user, "User details updated successfully")
    );
  });
  
  // function to get user details by id
  const getUserDetails = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await User.findById(userId).select("-password -refreshToken");
      if (!user) {
        throw new ApiError(404, "User not found");
      }
      return res.status(200).json(new ApiResponse(200, user, "User details fetched successfully"));
    } catch (error) {
      throw new ApiError(500, `Error fetching user details: ${error.message}`);
    }
  });

  const followUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userToFollowId = req.body.userId;
  
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    const userToFollow = await User.findById(userToFollowId);
    if (!userToFollow) {
      throw new ApiError(404, "User to follow not found");
    }
  
    if (user.following.includes(userToFollowId)) {
      throw new ApiError(400, "You are already following this user");
    }
  
    user.following.push(userToFollowId);
    await user.save();

    userToFollow.followers.push(userId);
    await userToFollow.save();
  
    return res.status(200).json(new ApiResponse(200, null, "User followed successfully"));
  });
  
  const unfollowUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userToUnfollowId = req.body.userId;
  
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    const userToUnfollow = await User.findById(userToUnfollowId);
    if (!userToUnfollow) {
      throw new ApiError(404, "User to unfollow not found");
    }
  
    if (!user.following.includes(userToUnfollowId)) {
      throw new ApiError(400, "You are not following this user");
    }

    user.following = user.following.filter(id => id.toString() !== userToUnfollowId);
    await user.save();
  
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== userId);
    await userToUnfollow.save();
  
    return res.status(200).json(new ApiResponse(200, null, "User unfollowed successfully"));
  });
  
  const checkIfFollowing = asyncHandler(async (req, res) => {
    const currentUserId = req.query.userId || req.body.userId; 
    const userToCheckId = req.params.userId;
    
    const user = await User.findById(currentUserId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    const isFollowing = user.following.includes(userToCheckId);
    res.status(200).json({ isFollowing });
  });
  


export { registerUser, loginUser, updateUserDetails, getUserDetails, getAllUsersDetails, unfollowUser ,followUser, checkIfFollowing};
