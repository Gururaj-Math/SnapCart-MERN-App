import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating access token`
    );
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

const loginUser = asyncHandler(async (req, resp) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, `Username is required`);
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(400, `User does not exist`);
  }

  const CheckPassword = await user.isPasswordCorrect(password);

  if (!CheckPassword) {
    throw new ApiError(401, `Invalid Password`);
  }

  // access token

  const { accessToken } = await generateAccessToken(user._id);

  const UserInfo = await User.findById(user._id).select(" --password");

  return resp.status(200).json(
    new ApiResponse(
      200,
      {
        user: UserInfo,
        access_token: accessToken,
      },
      `User logged In Successfully`
    )
  );
});

export { registerUser, loginUser };
