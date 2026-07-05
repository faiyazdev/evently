import mongoose, {
  models,
  Schema,
  Document,
  Model,
  InferSchemaType,
} from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true }, // Fixed typo: uniqe -> unique
  email: { type: String, required: true, unique: true }, // Fixed typo: uniqe -> unique
  username: { type: String, required: true, unique: true }, // Fixed typo: uniqe -> unique
  firstName: { type: String, required: true },
  lastName: String,
  photo: { type: String, required: true },
});

const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", UserSchema);
export type UserType = InferSchemaType<typeof UserSchema>;

export default User;
