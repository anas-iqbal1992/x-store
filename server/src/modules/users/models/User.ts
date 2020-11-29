import { Document, Model, model, Types, Schema, Query } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
import {UserInterface} from "../interfaces/user";

const AddressSchema = new Schema(
  {
    address:{type: String, required: true},
    city: { type: String, required: true },
    country: String,
    zip: String,
  },
  { _id: false, timestamps: true }
);

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v:string) {
        return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid Email!`,
    },
    lowercase: true,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: [true, "User phone number required"],
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  password: { type: String, required: true },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
userSchema.plugin(uniqueValidator);
export interface IUserModel extends UserInterface, Document {
  checkPassword(password:string):boolean;
}
userSchema.path("phone").validate(async function (value:{length:number}):Promise<boolean> {
  return value.length == 10;
}, "Invalid Phone Number.");
userSchema.pre<IUserModel>("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});
userSchema.methods.checkPassword = async function (password:string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};
export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);

