import logo from "../../assets/Updated_RoadWatch_Logo.svg"
import styles from "./ResetPasswordVerify.module.scss"
import { Button } from '@mui/material'


export default function ResetPasswordVerify(): JSX.Element {

    return (
        <div className={styles['ResetPasswordVerify__container']} data-testid={'ResetPasswordVerify'}>
            <div className={styles["ResetPasswordVerify__protectionDiv"]} />
            <div className={styles['ResetPasswordVerify__logoContainer']}>
                <img
                    src={logo}
                    alt="Displaying logo for reset password verify email page"
                />
            </div>
            <div className={styles['ResetPasswordVerify__textContainer']}>
                <p className={styles['ResetPasswordVerify__text']}>
                    Email verification, Check your email
                </p>
                <p className={styles['ResetPasswordVerify__text2']}>
                    To confirm your email address, tap the button in the email we sent to
                    roadwatch@email.com
                </p>
            </div>
            <div className={styles['ResetPasswordVerify__verifyButtonContainer']}>
                <Button className={styles['ResetPassword__verifyButton']}>
                    VERIFY
                </Button>
            </div>
            <div className={styles['ResetPasswordVerify__textContainer2']}>
                <p className={styles['ResetPasswordVerify_text3']}>
                    SIGN IN MANUALLY
                </p>
            </div>
        </div>
    );

}