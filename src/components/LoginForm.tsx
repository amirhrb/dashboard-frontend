import Link from "next/link";

//styles
import styles from "@/components/LoginForm.module.css";

//3rd party libs
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//custom elements
import Input from "./elements/Input";
import { Dispatch, SetStateAction } from "react";

//form validation
const schema = yup
  .object({
    Email: yup.string().email().required("Required field"),
    Password: yup.string().required("Required field"),
  })
  .required();
export type FormDataTypes = yup.InferType<typeof schema>;

const LoginForm = ({
  setShow,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataTypes>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormDataTypes> = (data) =>
    setShow((prev) => !prev);

  return (
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
        className="btn btn-primary btn-sm btn-block"
      />
      <p className="Text-Style">
        Don’t have account? <Link href="/register">Register Now</Link>
      </p>
    </form>
  );
};

export default LoginForm;
