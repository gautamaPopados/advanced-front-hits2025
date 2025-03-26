// components/LanguageSelector/LanguageSelector.tsx
import { useState, useEffect, useRef } from 'react';
import styles from './LanguageSelector.module.css';
import russianIcon from "../../../assets/russian.svg";
import englishIcon from "../../../assets/english.svg";
import arrowIcon from "../../../assets/arrow.svg";
import { useTranslation } from "react-i18next";


interface Language {
    code: string;
    name: string;
    icon: string;
  }
  
  const languages: Language[] = [
    { code: "en", name: 'English', icon: englishIcon },
    { code: "ru", name: 'Русский', icon: russianIcon },
  ];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = languages.find(lang => lang.code === i18n.language.substring(0,2));

  const changeLanguage = async (lang: "en" | "ru") => {
    await i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: "en" | "ru") => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.languageName}>{selectedLanguage?.name}</div>
        <div className={styles.iconsContainer}>
          <img 
            src={selectedLanguage?.icon} 
            alt={selectedLanguage?.code}
            className={styles.languageIcon}
          />
          <img src={arrowIcon} className={`${styles.arrow} ${isOpen ? styles.up : styles.down}`}  alt="arrow" />
        </div>
        
      </div>
      
      <div className={styles.listContainer}>
      {isOpen && (
        <ul className={styles.languageList}>
          {languages.map((language, index) => (
            <>
              <li
                key={language.code}
                className={styles.languageItem}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <img 
                  src={language.icon} 
                  alt={language.code}
                  className={styles.languageIcon}
                />
                {language.name}
              </li>
              {index != languages.length - 1 && <div className={styles.line}/>}
            </>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default LanguageSelector;