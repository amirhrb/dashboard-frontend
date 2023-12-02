import React from "react";

// styles
import styles from "./Aside.module.css";

//very special customized next/Link to Navlink
import NavLink from "../elements/NavLink";

const Aside = () => {
  return (
    <aside className={styles.sidebar}>
      <h2>Post</h2>
      <ul>
        <li>
          <NavLink activeClassName={styles.active} href="/articles">
            All Articles
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} href="/articles/create">
            New Article
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
