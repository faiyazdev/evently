import mongoose, { models, Schema } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, uniqe: true },
  email: { type: String, required: true, uniqe: true },
  username: { type: String, required: true, uniqe: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
});

const User = models.User || mongoose.model("User", UserSchema);

export default User;
