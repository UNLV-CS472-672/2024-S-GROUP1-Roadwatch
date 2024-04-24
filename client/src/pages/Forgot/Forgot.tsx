import styles from './Forgot.module.scss';
import { ForgotPassword } from '@/components';

export default function Reset(): JSX.Element {
    return (
        <div className={styles['Forgot']} data-testid={'Forgot-container'}>
            <ForgotPassword data-testid={'ForgotPassword-component'}/>
        </div>
    );
}