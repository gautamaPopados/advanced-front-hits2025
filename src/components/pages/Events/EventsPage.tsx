import styles from "./EventsPage.module.css";
import Header from "../../layout/header/Header";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n/i18n";
import Breadcrumb from "../../layout/breadcrumb/Breadcrumb";
import MySidebar from "../../layout/sidebar/Sidebar";
import { useState } from "react";
import { useAuthContext } from "../../../api/hooks/auth/use-auth-context";

const EventsPage = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated } = useAuthContext();
  
  const breadcrumbPath = [
    { label: "Главная", link: "/" }
  ];

  return (
    <>
      <MySidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`${styles.container}  ${ isAuthenticated ? (collapsed ? styles.collapsedContainer : styles.notCollapsedContainer) : ''}`}>
        <Header text= {t("events.headerTitle")}/>
        <Breadcrumb path={breadcrumbPath}/>
      </div> 
    </>

  );
}

export default EventsPage;