import { SignIn } from "../models/login.models";

export const login = async (data: SignIn) => {
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


export const forgotUserPassword = async (email: string) => {
  const url = `${process.env.API_URL}/api/properties/properties/`;
  return (await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      email,
    }),
  })).json();
};

export const resetUserPassword = async (password: string) => {
  const url = `${process.env.API_URL}/api/properties/properties/`;
  return (await fetch(url, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      password,
    }),
  })).json();
};
