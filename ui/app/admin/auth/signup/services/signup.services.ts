import { SignUp } from "../models/signup.models";

export const signUp = async (data: SignUp) => {
  const url = `${process.env.API_URL}/api/properties/properties/`;
  return (await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      data,
    }),
  })).json();
};