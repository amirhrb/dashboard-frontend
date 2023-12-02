import React from "react";
import { AlertTypes, SetAlertTypes } from "../../../types/types";

const CreateTemplate = ({
  alertData,
  setAlert,
}: {
  alertData: AlertTypes;
  setAlert: SetAlertTypes;
}) => {
  return (
    <div>
      <span>content</span>
      <button
        onClick={() =>
          setAlert((prev) => ({
            isShowed: !prev.isShowed,
            message: "hello hello hello hello tsr thr",
            variant: "danger",
            dismissible: true,
          }))
        }
      >
        click me
      </button>
    </div>
  );
};

export default CreateTemplate;
