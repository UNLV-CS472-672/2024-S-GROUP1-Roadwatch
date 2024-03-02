import React, { useState } from 'react';
import styles from './PasswordField.module.scss';
import hide from '../../../assets/hidePasswordIcon.png';
import show from '../../../assets/showPasswordIcon.png'; 

/***
 * Parameters for the password field
 * header: Required. String of the header for the textbox. Example: "Enter Password"
 * setInputValue: Required. Variable to set the input value of the password
 */
interface PasswordFieldProps {
    header: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

/***
 * Creates a password field with a header
 * @param header: String. The header of the password field 
 * @param setInputValue: useState. Variable to set the input value of the password, send the 'set' variable
 */
export const PasswordField: React.FC<PasswordFieldProps> = ({ header, setInputValue }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className={styles['PasswordField__header']}>{header}</div>
            <div className={styles['PasswordField__container']}>
                <input
                    className={styles['PasswordField__textBox']}
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    placeholder={`Enter ${header}`}
                />
                <button 
                    className={styles['PasswordField__showPasswordBtn']}
                    onClick={togglePasswordVisibility}
                >
                    <img src={showPassword ? hide : show} height={"100%"}/>
                </button>
            </div>
        </div>
    );
};
