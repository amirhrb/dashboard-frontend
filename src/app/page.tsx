"use client";

import styles from "@/app/page.module.css";

import DismissibleAlert from "@/components/DismissibleAlert";
import LoginForm from "@/components/LoginForm";
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);

  return (
    <main className={styles.mainContainer}>
      <LoginForm setShow={setShow} />
      <DismissibleAlert
        message="Login Failed!  User name and/or Password is invalid"
        show={show}
        styles={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      />
    </main>
  );
}
