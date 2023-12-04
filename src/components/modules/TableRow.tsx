// react next
import Image from "next/image";
// styles
import styles from "./TableRow.module.css";
// components
import DateTableCell from "./DateTableCell";
// types
import { ArticleDataTypes, SetAlertTypes } from "../../../types/types";

const TableRow = ({
  article,
  setAlert,
  page,
  limit,
  index,
}: {
  article: ArticleDataTypes;
  setAlert: SetAlertTypes;
  page: number;
  limit: number;
  index: number;
}) => {
  return (
    <tr key={article.slug}>
      <td>{(page - 1) * limit + index + 1}</td>
      <td>
        {article.title
          .split(" ")
          .slice(0, 21)
          .join(" ")
          .split(/\\n/)
          .map((line) => (
            <span key={line}>{line}</span>
          ))}
        {article.title.split(" ").length > 20 && "..."}
      </td>
      <td>{article.author.username}</td>
      <td>
        {article.tagList.length ? (
          article.tagList.map((tag) => (
            <span className="badge badge-primary" key={article.slug + tag}>
              {tag}
            </span>
          ))
        ) : (
          <Image
            src="/exclamation-octagon.svg"
            width={20}
            height={20}
            alt="no tages!"
          />
        )}
      </td>
      <td className={styles.tableBodyText}>
        {article.body
          .split(" ")
          .slice(0, 21)
          .join(" ")
          .split(/\\n/)
          .map((line) => (
            <p key={line}>{line}</p>
          ))}
      </td>
      <DateTableCell article={article} setAlert={setAlert} />
    </tr>
  );
};

export default TableRow;
