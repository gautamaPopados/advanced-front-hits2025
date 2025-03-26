import styles from './Button.module.css'

interface ButtonProps {
    type?: "submit" | "button" | "reset" | undefined;
    children?: React.ReactNode;
    onClick?: () => void;
    className: string;
}

const Button = ({
    type,
    children,
    onClick,
    className,
    ...rest
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={styles[className]}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;