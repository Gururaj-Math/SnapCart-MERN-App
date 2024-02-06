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
  

export { registerUser, loginUser };
