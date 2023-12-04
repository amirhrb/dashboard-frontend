//styles
import styles from "./ArticlesTemplate.module.css";
//types
import { AlertTypes, SetAlertTypes } from "../../../types/types";
// 3rd party components
import { Table } from "react-bootstrap";
// thanstack-query
import { useQuery } from "@tanstack/react-query";
// http requests
import { getArticles } from "@/utils/httpRequests";
// components
import TableBody from "../modules/TableBody";
import Pagination from "../modules/Pagination";

const ArticlesTemplate = ({
  alertData,
  setAlert,
  page = 1,
  limit = 10,
}: {
  alertData: AlertTypes;
  setAlert: SetAlertTypes;
  page?: number;
  limit?: number;
}) => {
  // Queries
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(page),
    refetchIntervalInBackground: true,
  });

  if (isError) {
    setAlert({
      isShowed: true,
      dismissible: true,
      variant: "danger",
      message: "Something went wrong!",
    });
    throw Error(error ? error?.message : "Something went wrong!");
  }

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
        <TableBody
          alertData={alertData}
          setAlert={setAlert}
          page={page}
          limit={limit}
          isPending={isPending}
          isError={isError}
          data={data}
        />
      </Table>
      {!isPending && !isError && data && (
        <Pagination
          articlesCount={data.data.articlesCount}
          limit={limit}
          page={page}
        />
      )}
    </div>
  );
};

export default ArticlesTemplate;
