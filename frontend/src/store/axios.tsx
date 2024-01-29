// export const retriveAllTodo = () =>
//   axiosBaseURL.get(`/`, {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//   });

import { SigninBody, SignupBody } from "../components/models/requestBody";
import { axiosBaseURL } from "./apiclient";

//   export const deleteTodo = (id:string) =>
//   axiosBaseURL.delete(`/${id}`, {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//   });

export const SignIn = (credential: SigninBody) =>
  axiosBaseURL.post("/user/signin", {
    username: credential.username,
    password: credential.password,
  });

export const SignupQuery = (credential: SignupBody) =>
  axiosBaseURL.post("/user/signup", {
    username: credential.username,
    password: credential.password,
    firstName: credential.firstName,
    lastName: credential.lastName,
  });

export const GetUsers = (filter: string, token: string) =>
  axiosBaseURL.get(`user?filter=${filter}`, {
    headers: {
      Authorization: token,
    },
  });

export const TransferMoney = (
  toUserId: string,
  amount: number,
  token: string
) =>
  axiosBaseURL.post(
    "/account/transfer",
    {
      toUserId: toUserId,
      amount: amount,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  export const GetBalance = (token: string) =>
    axiosBaseURL.get(
      "/account/balance",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    export const GetCurrentUser = (token: string) =>
    axiosBaseURL.get(
      "/user/currentuser",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );