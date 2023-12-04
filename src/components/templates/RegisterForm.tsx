"use client";

// react
import { useContext, useEffect } from "react";
// next
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
    User: yup.string().required("Required field"),
    Email: yup.string().email().required("Required field"),
    Password: yup.string().required("Required field"),
  })
  .required();
export type FormDataTypes = yup.InferType<typeof schema>;

const RegisterForm = () => {
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
  const { registerUser, getCurrentUser } = useAuth();

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
    await registerUser({
      username: data.User,
      email: data.Email,
      password: data.Password,
    })
      .then((data) => {
        if (data.user) {
          setUserData({ data: data, status: "authorized" });
        } else {
          if (
            data.response.data.errors.email ||
            data.response.data.errors.email
          ) {
            setAlert({
              isShowed: true,
              variant: "danger",
              message: "Failed! Username and/or Password is already taken",
            });
          } else {
            setAlert({
              isShowed: true,
              variant: "danger",
              message: "Failed! Username and/or Password is invalid",
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <Input
          type="text"
          errors={errors}
          label="User"
          register={register}
          required
        />
        <Input
          type="text"
          errors={errors}
          label="Email"
          register={register}
          required
        />
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
          value="Register"
          disabled={userData?.status !== "unauthorized"}
          className="btn btn-primary btn-sm btn-block"
        />
        <p className="Text-Style">
          Already Registered? <Link href="/">Login</Link>
        </p>
      </form>
      <AlertProvider
        styles={{ position: "absolute", top: "10px", right: "10px" }}
      />
    </>
  );
};

export default RegisterForm;
