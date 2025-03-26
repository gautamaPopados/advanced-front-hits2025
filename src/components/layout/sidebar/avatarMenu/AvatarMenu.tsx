import { useState, useRef, useEffect } from "react";
import styles from "./AvatarMenu.module.css";
import { useTranslation } from "react-i18next";
import LogoutIcon from "../../../../assets/menuIcons/logout.svg?react";

interface AvatarMenuProps {
  avatarUrl?: string;
  onLogout: () => void;
  className?: string;
}

const AvatarMenu = ({ avatarUrl, onLogout, className } : AvatarMenuProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={className} ref={dropdownRef}>
      <div className={styles.imgContainer}>
        <img 
          src={avatarUrl || "src/assets/default-avatar.png"} 
          alt="User Avatar" 
          className={styles.avatar} 
          onClick={() => setIsOpen(!isOpen)} 
        />
      </div>
      <div className={styles.menuContainer}>
        <button className={`${styles.menu} ${!isOpen ? styles.up : styles.down}`} onClick={onLogout}>
          <span>{t("layout.sidebar.logout")}</span>
          <LogoutIcon/>
        </button>
      </div>
    </div>
  );
};

export default AvatarMenu;
