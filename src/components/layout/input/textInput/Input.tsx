import styles from './Input.module.css'
import glassIcon from "../../../../assets/glass.svg";
import crossIcon from "../../../../assets/cross.svg";
import { useState } from 'react';


interface InputProps {
    type?: "text" | "email" | "password" | "search" | "small";
    placeholder?: string;
    supportingText?: string;    
    label?: string;  
    maxLength?: number;   
    value: string;
    required?: boolean;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Input = ({
    type = "text",
    placeholder = " ",
    supportingText,
    label,
    onChange,
    required,
    disabled
  }: InputProps) => {
    const [value, setValue] = useState("");

    const onInput = (event: React.FormEvent) => setValue((event.target as HTMLTextAreaElement).value);

    const onClear = () => {
      setValue("");
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.textFieldContainer} ${type == "small" ? styles.small : ''}`}>
              <div className={`${styles.stateLayer} ${type == "small" ? styles.small : ''}`}>
                {type == "search" && <img src={glassIcon} />}
                <input
                    type={type}
                    className={styles.textField}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onInput={onInput}
                    required={required}
                    disabled={disabled}
                />
                  {type == "search" && <img onClick={onClear} src={crossIcon} />}
              </div>
              <label  className={styles.textLabel}>{label}</label>
            </div>
            
            <div className={styles.supportingTextContainer}>
                <p className={styles.supportingText}>{supportingText}</p>
            </div>
        </div>
      
    );
  };
  
  export default Input;