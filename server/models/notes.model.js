import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 
    }    
  },
  { timestamps: true }
);

NoteSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

export const Note = mongoose.model("Note", NoteSchema);
