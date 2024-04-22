import styles from './Forgot.module.scss';
import { ForgotPassword } from '@/components';

export default function Reset(): JSX.Element {
    return (
        <div className={styles['Forgot']}>
            <ForgotPassword />
        </div>
    );
}