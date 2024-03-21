import styles from './LocationNotification.module.scss';
// import {Box, Card,CardContent, Typography, Stack} from '@mui/material'
import {CustomButton} from '@/components'
// import {styled} from '@mui/system'
import UpdatedRoadWatchLogo from '../../assets/Updated_RoadWatch_Logo.svg'

interface LocationNotificationProps {
    onConfirmButtonClick: () => void;
    onCancelButtonClick: () => void;
}

// const StyledNoti = styled(Card)()


const LocationNotification: React.FC<LocationNotificationProps> = ({  
    onConfirmButtonClick, 
    onCancelButtonClick }) => { 

        return (
            <div className={styles['LocationNotification__container']}>
              <div className={styles['LocationNotification__image']}>
                <img
                  src={UpdatedRoadWatchLogo}
                  alt="Displaying logo for location notification text page"
                />
              </div>

              <div className={styles['LocationNotification__header']}>
                <p>
                  Allow Location Access
                </p>
                <p className={styles['LocationNotification__message']}>
                    We need to access your Location
                </p>
              </div>

              <div className={styles['LocationNotification__buttonContainer']}>
                <CustomButton className={styles['LocationNotification__confirmButton']} onClick={onConfirmButtonClick}>
                  CONFIRM
                </CustomButton>
              </div>

              <div className={styles['LocationNotification__buttonContainer2']}>
              <CustomButton className={styles['LocationNotification__cancelButton']} onClick={onCancelButtonClick}>
                  CANCEL
                </CustomButton>
              </div>
            </div>
          );
};

export default LocationNotification;