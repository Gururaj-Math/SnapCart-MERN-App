import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Posts } from "../models/posts.model.js";
import { User } from "../models/user.model.js";

// function to get all posts
const getAllPosts = asyncHandler(async (_, resp) => {
  try {
    const posts = await Posts.find({});

    return resp
      .status(200)
      .json(new ApiResponse(200, posts, `All posts fetched successfully`));
  } catch (error) {
    throw new ApiError(400, `Couldn't find posts ${error}`);
  }
});

// function to create post
const createPost = asyncHandler(async (req, resp) => {
  const post = new Posts(req.body);
  try {
    const response = await post.save();

    return resp
      .status(200)
      .json(new ApiResponse(200, response, `Post created successfully`));
  } catch (error) {
    throw new ApiError(400, `Couldn't create post: ${error}`);
  }
});

// function to save post
const savePost = asyncHandler(async (req, resp) => {
  const post = await Posts.findById(req.body.postID);
  const user = await User.findById(req.body.userID);
  
  try {
    if (!user) {
      throw new ApiError(404, `User not found`);
    }

    user.savedPosts.push(post);
    await user.save();
    resp
      .status(201)
      .json(
        new ApiResponse(
          200,
          { savedPosts: user.savedPosts },
          `Post saved successfully`
        )
      );
  } catch (err) {
    throw new ApiError(400, `Couldn't save post ${err}`);
  }
});

// function to get IDs of saved posts
const getIdsOfSavedPosts = asyncHandler(async (req, resp) => {
  try {
    const user = await User.findById(req.params.userId);
    resp
      .status(201)
      .json(new ApiResponse(200, user, `Post IDs saved successfully`));
  } catch (error) {
    throw new ApiError(400, `Couldn't get IDs of saved posts`);
  }
});

// function to get all saved posts
const getSavedPosts = asyncHandler(async (req, resp) => {
  try {
    const user = await User.findById(req.params.userId);
    const savedPosts = await Posts.find({ _id: { $in: user.savedPosts } });
    resp
      .status(201)
      .json(
        new ApiResponse(200, savedPosts, `Saved posts fetched successfully`)
      );
  } catch (error) {
    throw new ApiError(400, `Couldn't find saved posts`);
  }
});

// function to get user's posts
const getUserPosts = asyncHandler(async (req, resp) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new ApiError(400, `User not found`);
  }

  try {
    const userPosts = await Posts.find({ userOwner: user._id });
    return resp
      .status(200)
      .json(
        new ApiResponse(200, userPosts, `User's posts fetched successfully`)
      );
  } catch (error) {
    throw new ApiError(400, `User not found: ${error}`);
  }
});

// function to delete user's post
const deleteUserPosts = asyncHandler(async (req, resp) => {
  const post = await Posts.findByIdAndDelete(req.params.postId);

  if (!post) {
    throw new ApiError(400, `Post not found`);
  } else {
    return resp.status(200).json(new ApiResponse(202, `Post deleted`));
  }
});

// function to update user's post
const updateUserPost = asyncHandler(async (req, resp) => {
  const post = req.params.postId;
  const updateFields = req.body;

  if (!post) {
    throw new ApiError(400, `Post not found`);
  }

  if (!updateFields) {
    throw new ApiError(400, `Updated fields not found`);
  }

  const updatedPost = await Posts.findByIdAndUpdate(post, updateFields, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    throw new ApiError(400, `Post not found`);
  }

  return resp
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

// function to remove saved post
const removeSavedPost = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  if (!userId) {
    throw new ApiError(400, `User not found`);
  }

  if (!postId) {
    throw new ApiError(400, `Post not found`);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { savedPosts: postId } },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, `User not found`);
  }

  res.status(200).json(
    new ApiResponse(200, `Post removed from saved`, {
      savedPosts: user.savedPosts,
    })
  );
});

// Get specific post by ID
const getPostById = asyncHandler(async (req, resp) => {
  const postId = req.params.id;

  if (!postId) {
    throw new ApiError(400, `Post not found`);
  }

  const post = await Posts.findById(postId);

  if (!post) {
    throw new ApiError(400, `Post not found`);
  }

  resp
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});

export {
  getAllPosts,
  createPost,
  savePost,
  getIdsOfSavedPosts,
  getSavedPosts,
  getUserPosts,
  deleteUserPosts,
  updateUserPost,
  removeSavedPost,
  getPostById,
};
