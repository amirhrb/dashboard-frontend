// components
import Aside from "@/components/layouts/Aside";
import Header from "@/components/layouts/Header";
// styles
import styles from "./layout.module.css";

const NestedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className={styles.gridContainer}>
        <Aside />
        <main className={styles.contentContainer}>{children}</main>
      </div>
    </>
  );
};
export default NestedLayout;
