import styles from "./Switch.module.css";

interface SwitchProps {
  checked: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({
    checked, 
    disabled, 
    onChange
 }: SwitchProps) => {
    return (
        <label className={`${styles.switch} ${disabled ? styles.disabled : ""}`}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
        <span className={styles.slider}></span>
        </label>
    );
};

export default Switch;
