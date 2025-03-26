import { useAuthContext } from '../../../api/hooks/auth/use-auth-context';
import Button from '../input/button/Button';
import LanguageSelector from '../language/LanguageSelector';
import styles from './Header.module.css'
import HamburgerIcon from '../../../assets/hamburger.svg?react'

interface HeaderProps {
    isLoggingIn?: boolean,
    text?: string,
    collapsed?: boolean,
    setCollapsed: (collapsed : boolean) => void;
}

const Header = ({
    isLoggingIn,
    text,
    collapsed,
    setCollapsed
}: HeaderProps) => {
    const { isAuthenticated } = useAuthContext();
    return (
    <header className={styles.header}>
        <button className={`${styles.hamburger} ${collapsed || !isAuthenticated ? styles.hamCollapsed : ''}`} onClick={()=> setCollapsed(!collapsed)}>
            <HamburgerIcon/>
        </button>
        
        <h1 className={`${styles.text} ${collapsed ? styles.collapsed : ''}`}>{text}</h1>
        <div className={styles.rightSide}>
        {(!isLoggingIn && !isAuthenticated) && <Button className={styles.loginButton}><a href="/login">Login</a></Button>}
        <LanguageSelector/>
        </div>
        
    </header>
    );
}

export default Header;