import styles from './EnableNotification.module.scss';
import {CustomButton } from '@/components';
import notifBell from '../../assets/EnableNotif_bell.svg'; 

interface EnableNotificationProps {
  onAllowButtonClick: () => void;
}

const EnableNotification: React.FC<EnableNotificationProps> = ( 
  onAllowButtonClick) => { 

      return (
        <div className={styles['EnableNotification__notifContainer']}>
            <div className={styles['EnableNotification__whiteContainer']}>
            <div className={styles['EnableNotification__image']}>
              <img
                src={notifBell}
                alt="Displaying bell for enable notification page"
              />
            </div>

            <div className={styles['EnableNotification__header']}>
                Get Notifications
              <p className={styles['EnableNotification__message']}>
                  Push email and mobile notifications.
              </p>
            </div>

            <div className={styles['EnableNotification__buttonContainer']}>
              <CustomButton className={styles['EnableNotification__allowButton']} onClick={onAllowButtonClick}>
                ALLOW
              </CustomButton>
            </div>

            <div className={styles['EnableNotification__skipText']}>
              <b>SKIP</b>
            </div>

            </div>
          </div>
        );
};

export default EnableNotification;
