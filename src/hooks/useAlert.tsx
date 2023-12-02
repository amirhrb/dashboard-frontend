import { CSSProperties, useState } from "react";
import { Alert } from "react-bootstrap";

type AlertTypes = {
  message: string;
  status:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  dismissible: boolean;
  styles?: CSSProperties;
  cn?: string | undefined;
};

const useAlert = (defaultValue: boolean = false) => {
  const [show, setShow] = useState<boolean>(defaultValue);

  //Alert component
  const AlertProvider = ({
    message,
    status,
    dismissible,
    styles,
    cn,
  }: AlertTypes) => {
    return show ? (
      <Alert variant={status} className={cn} style={styles}>
        <span>{message}</span>
        <button
          onClick={() => setShow(false)}
          style={{
            color: "inherit",
            backgroundColor: "inherit",
            border: "none",
            marginLeft: "1rem",
          }}
        >
          {dismissible && (
            <span
              aria-hidden="true"
              style={{
                fontSize: "1.5rem",
                color: "var(--charcoal-grey)",
                opacity: "0.2",
              }}
            >
              &times;
            </span>
          )}
        </button>
      </Alert>
    ) : (
      ""
    );
  };
  return {
    AlertProvider,
    setShow,
  };
};

export default useAlert;
