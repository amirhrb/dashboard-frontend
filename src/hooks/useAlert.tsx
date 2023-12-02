import { useState } from "react";
import { Alert } from "react-bootstrap";

import {
  AlertComponentTypes,
  AlertTypes,
  SetAlertTypes,
} from "../../types/types";

const useAlert = (defaultValue: boolean = false) => {
  const [alert, setAlert] = useState<AlertTypes>({
    isShowed: defaultValue,
    message: "",
    variant: "success",
    dismissible: true,
  });

  //Alert component
  const AlertProvider: AlertComponentTypes = ({ styles, cn }) => {
    return alert.isShowed ? (
      <Alert variant={alert.variant} className={cn} style={styles}>
        <span>{alert.message}</span>
        <button
          onClick={() => setAlert({ isShowed: false, message: "" })}
          style={{
            color: "inherit",
            backgroundColor: "inherit",
            border: "none",
            marginLeft: "1rem",
          }}
        >
          {alert.dismissible && (
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
    alertData: alert,
    setAlert,
  } as {
    setAlert: SetAlertTypes;
    alertData: AlertTypes;
    AlertProvider: AlertComponentTypes;
  };
};

export default useAlert;
