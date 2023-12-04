"use client";

// 3rd party libs
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
// styles
import styles from "./Input.module.css";

// all kinds of form types need to be put down instead of any
type InputProps = {
  label: Path<any>;
  placeholder?: string;
  disabled?: boolean;
  errors: FieldErrors<any>;
  permanentError?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  invalid?: boolean;
  type?: string;
};

const Input = ({
  label,
  errors,
  placeholder,
  permanentError,
  register,
  disabled = false,
  required = false,
  invalid = false,
  type,
}: InputProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label className={errors[label] || invalid ? "error-text" : ""}>
        {label}
      </label>
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
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
