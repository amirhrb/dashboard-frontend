"use client";

import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

//styles
import styles from "./LoginForm.module.css";

//3rd party libs
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//custom elements
import Input from "../elements/Input";

//custom hooks
import useAlert from "../../hooks/useAlert";
import useAuth from "@/hooks/useAuth";

//contexts
import { UserDataContext } from "../providers/UserContextProvider";

//form validation
const schema = yup
  .object({
    Email: yup.string().email().required("Required field"),
    Password: yup.string().required("Required field"),
  })
  .required();
export type FormDataTypes = yup.InferType<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataTypes>({
    resolver: yupResolver(schema),
  });
  const path = usePathname();
  const { replace } = useRouter();

  // custom hooks
  const { AlertProvider, setAlert } = useAlert();
  const { loginUser, getCurrentUser } = useAuth();

  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    if (userData && userData.status === "authorized") {
      replace("articles");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    const userDataFn = async () => {
      await getCurrentUser()
        .then((res) => {
          setUserData(res);
          return;
        })
        .catch(() => {
          return;
        });
    };
    if (!userData) {
      userDataFn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const onSubmit: SubmitHandler<FormDataTypes> = async (data) => {
    await loginUser({
      email: data.Email,
      password: data.Password,
    }).then((res) => {
      if (res.user) {
        setUserData({ data: res, status: "authorized" });
      } else {
        setAlert({
          isShowed: true,
          variant: "danger",
          message: "Login Failed!  User name and/or Password is invalid",
        });
      }
    });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>LOGIN</h2>
        <Input errors={errors} label="Email" register={register} required />
        <Input
          type="password"
          errors={errors}
          label="Password"
          register={register}
          permanentError="Required filed"
          invalid
          required
        />
        <input
          type="submit"
          value="Login"
          disabled={userData?.status !== "unauthorized"}
          className="btn btn-primary btn-sm btn-block"
        />
        <p className="Text-Style">
          Don’t have account? <Link href="/register">Register Now</Link>
        </p>
      </form>
      <AlertProvider
        styles={{ position: "absolute", top: "10px", right: "10px" }}
      />
    </>
  );
};

export default LoginForm;
