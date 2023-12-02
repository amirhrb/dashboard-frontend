import styles from "@/app/page.module.css";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <LoginForm />
    </main>
  );
}
