import mongoose, { Schema } from "mongoose";

const PostsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    likes: {
      type: number,
      required: true,
    },

    comments: {
      type: [String],
      required: true,
    },

    tags: {
      type: [String],
      required: true,
    },

    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Posts = mongoose.model("Recipe", PostsSchema);
