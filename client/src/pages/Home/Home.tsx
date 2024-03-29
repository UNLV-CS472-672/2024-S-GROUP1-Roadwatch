import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { useGetUserQuery, selectLocation } from '@/store';
import { useSelector } from 'react-redux';
import { useLocation } from '@/hooks';
import { Header, Map, CustomButton, Navbar } from '@/components';

import { useLazySendNotificationQuery } from '@/store';

// Image imports
import logo from 'src/assets/Updated_RoadWatch_Logo.svg';
import warning_marker from 'src/assets/markers/WarningSign.svg';

export default function Home(): JSX.Element {
  const { data } = useGetUserQuery();
  useLocation();
  const reduxLocation = useSelector(selectLocation); // Get the location from the Redux store, if available
  const [sendNotification, notificationResult] = useLazySendNotificationQuery();

  // The map will load when location is set or user asks to load.
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [forceLoadMap, setForceLoadMap] = useState(false);

  // Standardize the location object to match the expected format for the Map component
  const transformedLocation = reduxLocation
    ? { lat: reduxLocation.latitude, lng: reduxLocation.longitude }
    : undefined;

  useEffect(() => {
    if (transformedLocation) {
      setIsLocationReady(true); // sets the location to ready.
    }
  }, [transformedLocation]); // Depend on transformedLocation

  // When the button is clicked, set forceLoadMap to true
  const handleLoadMapClick = () => {
    setForceLoadMap(true);
  };

  const handleNotificationRequest = async () => {
    const permission = await Notification.requestPermission().catch((e) => console.error(e));
  };

  const handleNotificationSend = async () => {
    await sendNotification({ message: 'Hello Jordan!' });
    console.log(notificationResult);
  };

  const handleNotificationSubscription = async () => {};

  return (
    <div className={styles['Home']}>
      <Navbar />
      <Header userName={data?.userName} />
      {/* Render the Map if the location is ready or if the user has requested to load the map */}
      {isLocationReady || forceLoadMap ? (
        <Map location={transformedLocation || { lat: 36.18811, lng: -115.176468 }} />
      ) : (
        <div>
          <img src={warning_marker} className={styles['Home__center_image']} alt="warning icon" />
          <p className={styles['Home__alert_message']}>
            Location not available.
            <br></br>
            Would you like to load the map anyway?
          </p>
          <div className={styles['Home__button_container']}>
            <CustomButton onClick={handleLoadMapClick}>Load Map Anyway</CustomButton>
          </div>
          <button onClick={handleNotificationRequest}>Request Notification Permission</button>
          <button onClick={handleNotificationSubscription}>Subscribe to Notifications</button>
          <button onClick={handleNotificationSend}>Send Notification</button>
        </div>
      )}
      <img src={logo} alt="RoadWatch Logo" className={styles['Home__logo']} />
    </div>
  );
}
