"use client";

import { handleLocalStorage } from "@/utils/localstorageFn";
import axios from "axios";

export type UserDataTypes = {
  user: {
    email: string;
    username: string;
    bio: string | null;
    image: string;
    token: string;
  };
};
export type ErrorDataTypes = {
  errors: any;
};

const useAuth = () => {
  const basePath = process.env.NEXT_PUBLIC_API_URL;

  // loginUser fn
  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const data = JSON.stringify({
      user: {
        email,
        password,
      },
    });
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    };
    const userData = await axios
      .post(`${basePath}/users/login`, data, { headers })
      .then(({ data }) => {
        if (data.user) handleLocalStorage("token", data.user.token);
        return data;
      })
      .catch((error) => error);
    return userData;
  };
  // register fn
  const registerUser = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    };
    const body = JSON.stringify({
      user: {
        email,
        password,
        username,
      },
    });

    const userData = await axios
      .post(`${basePath}/users`, {
        body,
        headers,
      })
      .then(({ data }) => {
        if (data.user) handleLocalStorage("token", data.user.token);
        return data;
      })
      .catch((error) => error);

    return userData;
  };
  //   get current user data
  const getCurrentUser = async (): Promise<{
    status: "unauthorized" | "authorized" | "pending";
    data?: UserDataTypes;
  }> => {
    let status: "unauthorized" | "authorized" | "pending" = "pending";

    const token = handleLocalStorage("token");
    if (!token) {
      return { status: "unauthorized" };
    }
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Token ${token}`,
    };
    const data = await axios
      .get(`${basePath}/user`, { headers })
      .then(({ data }) => {
        if (data.user) handleLocalStorage("token", data.user.token);
        status = "authorized";
        return data;
      })
      .catch(() => {
        status = "unauthorized";
        return;
      });

    return { data, status };
  };
  return {
    loginUser,
    registerUser,
    getCurrentUser,
  };
};

export default useAuth;
