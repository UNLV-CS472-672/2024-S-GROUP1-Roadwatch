import { useState } from 'react';
import styles from './EmailField.module.scss';
import TextField from '../TextField/TextField.tsx';

/** 
 * EmailField Component
 * Represents a form field for resetting password with email input and basic validation.
 * This component provides a text field for users to enter their email address and displays
 * an error message if the entered email format is invalid
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
        <div className={styles['EmailField__container']}>
            {/* Email TextField Component */}
            <TextField
                header="Email" // Header text for the email input field
                setInputValue={handleChange} // Handler function to update email input
                type="email" // Input type for email validation
            />
            {/* Display error message if the email format is invalid */}
            {!isValidEmail && (<p className={styles['EmailField__errorText']}>
                Invalid email format
            </p>
            )}
        </div>
    );
}
