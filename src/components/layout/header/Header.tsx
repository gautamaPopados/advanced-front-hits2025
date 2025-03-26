import { useAuthContext } from '../../../api/hooks/auth/use-auth-context';
import Button from '../input/button/Button';
import LanguageSelector from '../language/LanguageSelector';
import styles from './Header.module.css'

interface HeaderProps {
    isLoggingIn?: boolean,
    text?: string
}

const Header = ({
    isLoggingIn,
    text
}: HeaderProps) => {
    const { isAuthenticated } = useAuthContext();
    console.log(isAuthenticated);
    return (
    <header className={styles.header}>
        <h1 className={styles.text}>{text}</h1>
        <div className={styles.rightSide}>
        {(!isLoggingIn && !isAuthenticated) && <Button className={styles.loginButton}><a href="/login">Login</a></Button>}
        <LanguageSelector/>
        </div>
        
    </header>
    );
}

export default Header;