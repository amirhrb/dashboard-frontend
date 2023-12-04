// styles
import styles from "@/app/page.module.css";
// componenets
import RegisterForm from "@/components/templates/RegisterForm";

const RegisterPage = () => {
  return (
    <main className={styles.mainContainer}>
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
