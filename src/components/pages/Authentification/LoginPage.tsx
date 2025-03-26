import { useState } from "react";
import styles from "./LoginPage.module.css";
import mainImage from "../../../assets/main-image.svg";
import Input from "../../layout/input/textInput/Input";
import Button from "../../layout/input/button/Button";
import Switch from "../../layout/input/switch/Switch";
import Header from "../../layout/header/Header";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "../../../utils/i18n/i18n";
import { useAuthContext } from "../../../api/hooks/auth/use-auth-context";


const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { login } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      login(email, password, rememberMe);
      navigate('/');
    } catch {
      setErrorMessage(t("login.loginError"));
    }
  };

  const renderErrorMessage = () =>
      <div className={styles.errorMessage}>{errorMessage}</div>;
    
  return (
    <>
    <div className={styles.rootContainer}>
      <Header isLoggingIn/>
      <div className={styles.container}>
        <div className={styles.illustration}>
              <img src={mainImage} alt="Illustration" />
        </div>
        <div className={styles.loginForm}>
          <h1>{t("login.formTitle")}</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.input}>
              <Input
                type="email"
                label={t("login.emailLabel")}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}/>

              <Input
                type="password"
                label={t("login.passwordLabel")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={styles.input}>
              <label className={styles.rememberMe}>
                <Switch checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <div>{t("login.rememberMe")}</div> 
              </label>
              <Button className="primary">{t("login.loginButton")}</Button>
              {errorMessage != "" && renderErrorMessage()}
            </div>
          </form>
        </div>
      </div> 
      </div>
    </>

  );
}

export default LoginPage;