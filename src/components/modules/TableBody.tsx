// styles
import styles from "./TableBody.module.css";
// components
import TableRow from "./TableRow";
// types
import {
  AlertTypes,
  ArticleDataTypes,
  SetAlertTypes,
} from "../../../types/types";

const TableBody = ({
  setAlert,
  isPending,
  isError,
  data,
  page,
  limit,
}: {
  isPending: boolean;
  isError: boolean;
  data: any;
  page: number;
  limit: number;
  alertData: AlertTypes;
  setAlert: SetAlertTypes;
}) => {
  return (
    <tbody className={styles.tableBody}>
      {isPending
        ? Array.from(Array(1).keys()).map((num) => (
            <tr key={num}>
              <td>
                <div
                  className="spinner-border spinner-border-sm  text-primary"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
              <td>
                <div
                  className="spinner-border spinner-border-sm  text-primary"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
              <td>
                <div
                  className="spinner-border spinner-border-sm  text-primary"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
              <td>
                <div
                  className="spinner-border spinner-border-sm  text-primary"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
              <td>
                <div
                  className="spinner-border spinner-border-sm  text-primary"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
              <td>
                <div
                  className="spinner-border spinner-border-sm  text-primary"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          ))
        : isError
        ? ""
        : data.data.articles.map((article: ArticleDataTypes, index: number) => {
            return (
              <TableRow
                article={article}
                index={index}
                key={article.slug}
                limit={limit}
                page={page}
                setAlert={setAlert}
              />
            );
          })}
    </tbody>
  );
};

export default TableBody;
