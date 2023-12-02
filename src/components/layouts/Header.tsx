"use client";

import { useContext, useEffect } from "react";

// next
import { usePathname, useRouter } from "next/navigation";

//3rd party component
import { Button } from "react-bootstrap";

//styles
import styles from "./Header.module.css";

//custom hook
import useAuth from "@/hooks/useAuth";

//context
import { UserDataContext } from "../providers/UserContextProvider";

const Header = () => {
  const path = usePathname();
  const { replace } = useRouter();

  const { userData, setUserData } = useContext(UserDataContext);

  const { getCurrentUser } = useAuth();

  // (1.onmount 2.on path changes if we have userData null) check if user in logged in and save it, if is not so redirect to login page
  useEffect(() => {
    const userDataFn = async () => {
      await getCurrentUser()
        .then((res) => {
          setUserData(res);
          return;
        })
        .catch((error) => {
          return;
        });
    };
    if (!userData) {
      userDataFn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  // if userData requested but got unauthorized redirect to login page
  useEffect(() => {
    if (userData && userData.status === "unauthorized") replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const logOutHandler = () => {
    localStorage.removeItem("token");
    setUserData(null);
    replace("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.textsContainer}>
          <h2 className={styles.heading}>Arvan Challenge</h2>
          {userData && userData.data ? (
            <span>Welcome {userData.data.user.username} </span>
          ) : (
            <div
              className="spinner-border text-light spinner-border-sm"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        <Button
          variant="outline-info"
          onClick={logOutHandler}
          disabled={userData?.status !== "authorized"}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Header;
