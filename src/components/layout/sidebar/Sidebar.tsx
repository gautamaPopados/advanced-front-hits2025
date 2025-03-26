import { SetStateAction, useState } from "react";
import { Sidebar, Menu, MenuItem, menuClasses, sidebarClasses } from "react-pro-sidebar";
import styles from "./Sidebar.module.css";
import UserIcon from '../../../assets/menuIcons/user.svg?react';
import DocIcon from "../../../assets/menuIcons/document.svg?react";
import LinkIcon from "../../../assets/menuIcons/link.svg?react";
import MapIcon from "../../../assets/menuIcons/map.svg?react";
import AdminIcon from "../../../assets/menuIcons/admin.svg?react";
import CollapseIcon from "../../../assets/menuIcons/collapseIcon.svg?react";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../../api/hooks/auth/use-auth-context";
import AvatarMenu from "./avatarMenu/AvatarMenu";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed : boolean) => void;
}

const MySidebar = ({collapsed, setCollapsed} : SidebarProps)  => {
  const { isAuthenticated, logout } = useAuthContext();
  const { t } = useTranslation();

  return (
    <div className={isAuthenticated ? styles.container : styles.notAuth}>

      <AvatarMenu onLogout={logout} className={`${styles.avatar}  ${collapsed ? styles.avatarCollapsed : ''}`}/>

      <button className={`${styles.arrowButton}  ${collapsed ? styles.right : styles.left}`}
            onClick={() => setCollapsed(!collapsed)}>
              <CollapseIcon/>
      </button>

      <Sidebar collapsed={collapsed} width="280px" collapsedWidth="118px" backgroundColor="white">
            
        <Menu
          rootStyles={{
            [`.${menuClasses.menuItemRoot}`]: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0',
              gap: '8px',
              width: '280px',
              height: '48px',
              alignSelf: 'stretch',
              flexGrow: '0',
            },
            ['.' + menuClasses.button]: {
              backgroundColor: 'transparent',
              width: '100%',
              height: '48px',
              gap: collapsed ? '30px' : '0px' ,
              borderLeft: '3px solid transparent',
              WebkitBoxSizing: 'border-box',
              boxSizing: 'border-box',
              padding: collapsed ? '4px 39.5px' : '4px 31.5px',
              transition: 'all 0.2s linear',
              '&:hover': {
                backgroundColor: 'rgba(219, 226, 255, 0.1)'
              },
              '&:active': {
                backgroundColor: 'rgba(219, 226, 255, 0.1)'
              },
              '&:focus': {
                borderLeft: '3px solid rgb(0, 0, 0)',
                filter: 'invert(35%) sepia(41%) saturate(5687%) hue-rotate(221deg) brightness(98%) contrast(108%)'

              },
            },
          }}>
          <div className={styles.header}>
          </div>
          
          <MenuItem icon={<UserIcon/>} className={styles.menuItem}> {t("layout.sidebar.profile")} </MenuItem>
          <MenuItem icon={<AdminIcon/>} className={styles.menuItem}> {t("layout.sidebar.admin")} </MenuItem>
          <MenuItem icon={<DocIcon/>} className={styles.menuItem}> {t("layout.sidebar.docs")} </MenuItem>
          <MenuItem icon={<LinkIcon/>} className={styles.menuItem}> {t("layout.sidebar.services")} </MenuItem>
          <MenuItem icon={<MapIcon/>} className={styles.menuItem}> {t("layout.sidebar.events")} </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MySidebar;