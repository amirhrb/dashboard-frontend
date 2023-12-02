//styles
import styles from "./MainHeading.module.css";

//types
import { AlertComponentTypes } from "../../../types/types";

const MainHeading = ({
  heading,
  AlertProvider,
}: {
  heading: string;
  AlertProvider: AlertComponentTypes;
}) => {
  return (
    <div className={styles.container}>
      <h1>{heading}</h1>
      <AlertProvider cn={styles.alert} />
    </div>
  );
};

export default MainHeading;
