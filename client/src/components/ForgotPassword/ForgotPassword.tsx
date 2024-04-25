import { useState } from 'react';
import styles from './ForgotPassword.module.scss';
import TextField from '../TextField/TextField.tsx';
import CustomButton from '../CustomButton/CustomButton.tsx';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useForgotPasswordMutation } from '@/store';

/** 
 * ForgotPassword Component
 * Represents a form field for resetting password with email input and basic validation.
 * This component provides a text field for users to enter their email address and displays
 * an error message if the entered email format is invalid.
 * 
*/
export default function ForgotPassword(): JSX.Element {
    // State to track the validity of the entered email with the format
    const [isValidEmail, setIsValidEmail] = useState(false);
    const navigate = useNavigate();
    let location = useLocation().pathname.substring(1);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [email, setEmail] = useState('');
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();

    //handleChange function
    const handleChange = (value: string) => {
        // Basic email format validation
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setIsEmailTouched(true);

        if (value !== '') {
            setIsValidEmail(isValid);
            setEmail(value);
        } else {
            setIsValidEmail(false); // Set isValidEmail to false when email is empty
            setEmail('');
        }
    };

    if (location === '') {
        location = 'forgot-password';
    }

    if (location === 'login')
        location = 'login';

    const handleOpen = async () => {
        if (isValidEmail) {
            await forgotPassword({ email: email });
            setOpenConfirmation(true);
        }
    }

    const handleClose = () => {
        setOpenConfirmation(false);
        navigate('/login');
    }

    return (
        <>
            <body className={styles['ForgotPassword__body']} data-testid={'ForgotPassword'}>
                <div className={styles['ForgotPassword__container']}>
                    <div className={styles['ForgotPassword__component']}>
                        <div className={styles['ForgotPassword__buttonContainer']}>
                            <CustomButton
                                onClick={() => { navigate('/login') }}>
                                &lt;
                            </CustomButton>
                        </div>
                        <div className={styles['ForgotPassword__logoContainer']}>
                            <img
                                src={logo}
                                alt="Displaying logo for forgot password page"
                            />
                        </div>
                        <div className={styles['ForgotPassword__textContainer']}>
                            <p className={styles['ForgotPassword__text']}>
                                Reset your password
                            </p>
                            <p className={styles['ForgotPassword__text2']}>
                                Enter the email address associated with your account.
                            </p>
                        </div>
                        <div className={styles['ForgotPassword__textFieldContainer']}>
                            {/* Email TextField Component */}
                            <TextField
                                header="Email" // Header text for the email
                                setInputValue={handleChange}
                                type="email"
                            />
                            {/* Display error message if the email format is invalid */}
                            {isEmailTouched && !isValidEmail && (<p className={styles['ForgotPassword__errorText']}>
                                Invalid email format
                            </p>
                            )}
                        </div>
                        <div className={styles['ForgotPassword__sendButtonContainer']}>
                            <CustomButton
                                onClick={handleOpen}
                                disabled={!isValidEmail || email === ''}>
                                SEND
                            </CustomButton>
                            <Dialog
                                open={openConfirmation}
                                onClose={handleClose}
                            >
                                <DialogTitle>
                                    <b>
                                        Forgot password
                                    </b>
                                </DialogTitle>
                                <DialogContent>
                                    An email has been sent to <b>{email}</b> with instructions on how to reset your password.
                                </DialogContent>
                                <CustomButton
                                    onClick={handleClose}>
                                    Close
                                </CustomButton>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </body >
        </>
    );
}
