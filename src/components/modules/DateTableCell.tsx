// react next
import { useState } from "react";
import Link from "next/link";
// types
import { ArticleDataTypes, SetAlertTypes } from "../../../types/types";
// styels
import styles from "./DateTableCell.module.css";
// components
import Modal from "./Modal";
// http and query
import { deleteArticle } from "@/utils/httpRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DateTableCell = ({
  article,
  setAlert,
}: {
  article: ArticleDataTypes;
  setAlert: SetAlertTypes;
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Access the client
  const queryClient = useQueryClient();

  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: (e) => {
      // Invalidate and refetch
      if (e.status !== 204) {
        setAlert({
          isShowed: true,
          message: e.response.data.message
            ? e.response.data.message
            : "Data was not found!",
          variant: "danger",
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["articles"] });
        setAlert({
          isShowed: true,
          message: "Article deleted successfuly",
          variant: "success",
        });
      }
    },
    onError: (err) => {
      setAlert({ isShowed: true, message: err.message, variant: "danger" });
    },
  });

  const deleteHandler = () => {
    deleteArticleMutation.mutate(article.slug);
  };

  return (
    <td className={styles.tablesCell}>
      <span>
        {new Date(article.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Action
        </button>
        <div className="dropdown-menu">
          <Link
            className="dropdown-item"
            href={`/articles/edit/${article.slug}`}
          >
            Edit
          </Link>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleShow}>
            Delete
          </button>
        </div>
      </div>
      <Modal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        title="Delete Article"
        body="Are you sure to delete Article?"
        confirmText="Yes"
        dismissText="No"
        confirmFn={deleteHandler}
      />
    </td>
  );
};

export default DateTableCell;
