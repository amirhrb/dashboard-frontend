import { CSSProperties } from "react";

/* this component is used only in one page, in more difficult situation it is able to be handled with provider and a custom hook(worse performance because it would be csr) */

const DismissibleAlert = ({
  message,
  styles,
  classes,
  show = false,
}: {
  message: string;
  styles?: CSSProperties;
  classes?: string | undefined;
  show: boolean;
}) => {
  return (
    <div
      className={`alert alert-danger alert-dismissible fade ${
        show ? "show" : null
      } ${classes}`}
      role="alert"
      style={styles}
    >
      <span>{message}</span>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default DismissibleAlert;
