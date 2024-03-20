import { useState, } from 'react';
import styles from './ResetPassword.module.scss';
import TextField from '../TextField/TextField.tsx';
import { Button } from '@mui/material';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';

/** 
 * ResetPassword Component
 * Represents a form field for resetting password with email input and basic validation.
 * This component provides a text field for users to enter their email address and displays
 * an error message if the entered email format is invalid.
 * 
*/
export default function ResetPassword(): JSX.Element {
    // State to track the validity of the entered email with the format
    const [isValidEmail, setIsValidEmail] = useState(true);

    /**
     * handleChange Function
     * Handles changes in the email input field.
     * Validates the entered email format.
     * Updates the isValidEmail state
     * @param (string) value - the value of the email input field
     */
    const handleChange = (value: string) => {
        // Basic email format validation
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setIsValidEmail(isValid);
    };

    return (
        <div className={styles['ResetPassword__container']}>
            <div className={styles['ResetPassword_protectionDiv']} />
            <div className={styles['ResetPassword__buttonContainer']}>
                <Button className={styles['ResetPassword__backButton']}>
                    &lt;
                </Button>
            </div>
            <div className={styles['ResetPassword__logoContainer']}>
                <img
                    src={logo}
                    alt="Displaying logo for reset password page"
                />
            </div>
            <div className={styles['ResetPassword__textContainer']}>
                <p className={styles['ResetPassword__text']}>
                    Reset your password
                </p>
                <p className={styles['ResetPassword__text2']}>
                    Enter the email address associated with your account.
                </p>
            </div>
            <div className={styles['ResetPassword__textFieldContainer']}>
                {/* Email TextField Component */}
                <TextField
                    header="Email" // Header text for the email
                    setInputValue={handleChange}
                    type="email"
                />
                {/* Display error message if the email format is invalid */}
                {!isValidEmail && (<p className={styles['ResetPassword__errorText']}>
                    Invalid email format
                </p>
                )}
            </div>
            <div className={styles['ResetPassword__sendButtonContainer']}>
                <Button className={styles['ResetPassword__sendButton']}>
                    SEND
                </Button>
            </div>
        </div >
    );
}
