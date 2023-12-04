"use client";

// react
import React from "react";
// 3rd party libs
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
// styles
import styles from "./Input.module.css";

// all kinds of form types need to be put down instead of any
type InputProps = {
  placeholder?: string;
  disabled?: boolean;
  resizable?: boolean;
  rows?: number;
  label: Path<any>;
  errors: FieldErrors<any>;
  permanentError?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  invalid?: boolean;
};

const Textarea = ({
  label,
  disabled = false,
  errors,
  placeholder,
  resizable,
  rows,
  permanentError,
  register,
  required = false,
  invalid = false,
}: InputProps) => {
  return (
    <div className="form-group">
      <label className={errors[label] || invalid ? "error-text" : ""}>
        {label}
      </label>
      <textarea
        disabled={disabled}
        rows={rows}
        style={{ resize: `${resizable ? "vertical" : "none"}` }}
        placeholder={placeholder}
        {...register(label, { required })}
        aria-invalid={errors[label] || invalid ? "true" : "false"}
        className={`form-control ${invalid ? styles.focusedInvalid : ""}`}
      />
      <span role="alert" className="error-text small-text">
        {errors[label]?.message?.toString() || permanentError}
      </span>
    </div>
  );
};

export default Textarea;
