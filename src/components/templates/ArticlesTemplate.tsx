//styles
import styles from "./ArticlesTemplate.module.css";

//types
import { AlertTypes, SetAlertTypes } from "../../../types/types";
import { Table } from "react-bootstrap";

const ArticlesTemplate = ({
  alertData,
  setAlert,
}: {
  alertData: AlertTypes;
  setAlert: SetAlertTypes;
}) => {
  return (
    <div className={styles.container}>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Tags</th>
            <th>Excerpt</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ArticlesTemplate;
