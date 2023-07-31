import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
});

export const UserModel = model<IUser>("User", userSchema);