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
    },

    likes: {
      type: Number,
    },

    comments: {
      type: [String],
    },

    tags: {
      type: [String],
      required: true,
    },

    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }    
  },
  { timestamps: true }
);

export const Posts = mongoose.model("Post", PostsSchema);
