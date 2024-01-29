import { Schema, connect, model } from "mongoose";

connect("mongodb://localhost:27017/paytm");

export interface User {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const user = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
});

export const NewUser = model<User>("users", user);

export interface Account {
  userId: Object;
  balance: number;
}

const account = new Schema<Account>({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  balance: {
    type: Number,
    required: true,
  },
});

export const NewAccount = model<Account>("account", account)
