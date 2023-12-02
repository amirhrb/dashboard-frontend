import React from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { FormDataTypes } from "../LoginForm";

import styles from "./Input.module.css";

// all kinds of form types need to be put down instead of any
type InputProps = {
  label: Path<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  permanentError?: string;
  register: UseFormRegister<FormDataTypes>;
  required?: boolean;
  invalid?: boolean;
  type?: string;
};

const Input = ({
  label,
  errors,
  permanentError,
  register,
  required = false,
  invalid = false,
  type,
}: InputProps) => {
  return (
    <div>
      <label className={errors[label] || invalid ? "error-text" : ""}>
        {label}
      </label>
      <input
        type={type}
        {...register(label, { required })}
        aria-invalid={errors[label] || invalid ? "true" : "false"}
        className={invalid ? styles.focusedInvalid : ""}
      />
      <span role="alert" className="error-text small-text">
        {errors[label]?.message?.toString() || permanentError}
      </span>
    </div>
  );
};

export default Input;
