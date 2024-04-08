import styles from './EnableNotification.module.scss';
import { CustomButton } from '@/components';
import notifBell from '../../assets/EnableNotif_bell.svg';
import { useEffect, useRef } from 'react';
import {
  useNotificationSubscriptionMutation,
  useSendNotificationMutation,
  useGetUserQuery,
} from '@/store';

export default function EnableNotification(): JSX.Element {
  const [subscribe] = useNotificationSubscriptionMutation();
  const [sendNotification] = useSendNotificationMutation();
  const { data } = useGetUserQuery();
  const dialogRef = useRef<HTMLDialogElement>(null);

  /**
   * Only show the component if the user hasn't been prompted to enable notifications yet.
   */
  useEffect(() => {
    if (Notification.permission === 'default') {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, []);

  /**
   * Subscribes the user to receive push notifications. If that was successful,
   * it also sends the user a notification.
   */
  const handleAllowButtonClick = async (): Promise<void> => {
    if (!data?.id || !data?.firstName) {
      alert('Cannot enable notifications at this time.');
      dialogRef.current?.close();
      return;
    }

    try {
      await subscribe({ id: data.id });

      // This notification is only for demo purposes. We can remove it later.
      await sendNotification({
        id: data.id,
        title: 'Sucessfully enabled notifications 🎉',
        options: {
          body: `Thank you for enabling notifications, ${data.firstName}!`,
        },
      });
    } catch (error) {
      const errorMsg: Error = error as Error;
      alert(`Unable to enable notifications.\nReason: ${errorMsg.message}`);
    }

    dialogRef.current?.close();
  };

  /**
   * Doesn't subscribe the user to receive notifications and closes the component.
   */
  const handleSkipButtonClick = (): void => {
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className={styles[`EnableNotification__notifContainer`]}>
      <div className={styles['EnableNotification__whiteContainer']}>
        <div className={styles['EnableNotification__image']}>
          <img src={notifBell} alt="Displaying bell for enable notification page" />
        </div>

        <div className={styles['EnableNotification__header']}>
          Get Notifications
          <p className={styles['EnableNotification__message']}>
            Push email and mobile notifications.
          </p>
        </div>

        <div className={styles['EnableNotification__buttonContainer']}>
          <CustomButton
            className={styles['EnableNotification__allowButton']}
            onClick={handleAllowButtonClick}
          >
            ALLOW
          </CustomButton>
        </div>

        <CustomButton onClick={handleSkipButtonClick} design="text">
          SKIP
        </CustomButton>
      </div>
    </dialog>
  );
}
