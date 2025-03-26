import styles from "./EventsPage.module.css";
import Header from "../../layout/header/Header";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n/i18n";
import Breadcrumb from "../../layout/breadcrumb/Breadcrumb";
import MySidebar from "../../layout/sidebar/Sidebar";
import { useState } from "react";
import { useAuthContext } from "../../../api/hooks/auth/use-auth-context";
import Input from "../../layout/input/TextInput/Input";
import Button from "../../layout/input/button/Button";
import { DateInput } from "../../layout/input/DateInput/DateInput";

type TPeriodValue = [Date | null, Date | null];


const EventsPage = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState<string>("");
  const { isAuthenticated } = useAuthContext();



  const breadcrumbPath = [
    { label: "Главная", link: "/" }
  ];

  return (
    <>
      <MySidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`${styles.container}  ${ isAuthenticated ? (collapsed ? styles.collapsedContainer : styles.notCollapsedContainer) : ''}`}>
        <Header text= {t("events.headerTitle")} collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Breadcrumb path={breadcrumbPath} collapsed={collapsed} text={t("events.headerTitle")}/>
        <div className={styles.searchContainer}>
          <h3>{t("layout.searchBar.title")}</h3>
          <div className={styles.inputContainer}>
            <div className={styles.nameInput}><Input type="small" label="Название мероприятия" value={name} onChange={(e) => setName(e.target.value)}></Input></div>
            <div className={styles.submitButton}><Button type="submit" className="primary">{t("layout.searchBar.find")}</Button></div>
            <DateInput label="dw"
              value={date as Date}
              onChange={(date) => {
                setDate( date);
              }}/>
          </div>
        </div>
        <div className={styles.listContainer}>

        </div>
      </div> 
      <div className={styles.cover}></div>
    </>

  );
}

export default EventsPage;