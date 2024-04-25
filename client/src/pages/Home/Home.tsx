import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Home.module.scss';
import { useGetUserQuery, selectLocation } from '@/store';
import { useSelector } from 'react-redux';
import { useLocation } from '@/hooks';
import { Header, Map, CustomButton, Navbar, EnableNotification } from '@/components';

// Image imports
import logo from 'src/assets/Updated_RoadWatch_Logo.svg';
import warning_marker from 'src/assets/markers/WarningSign.svg';

export default function Home(): JSX.Element {
  useLocation();
  const { data } = useGetUserQuery();
  const reduxLocation = useSelector(selectLocation); // Get the location from the Redux store, if available

  // The map will load when location is set or user asks to load.
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [forceLoadMap, setForceLoadMap] = useState(false);
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array

  // Standardize the location object to match the expected format for the Map component
  const transformedLocation = reduxLocation
    ? { lat: reduxLocation.latitude, lng: reduxLocation.longitude }
    : undefined;

  useEffect(() => {
    if (transformedLocation) {
      setIsLocationReady(true); // sets the location to ready.
    }
  }, [transformedLocation]); // Depend on transformedLocation

  // Fetch posts when the component mounts
  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  }, []); // Add this useEffect to fetch posts

  // When the button is clicked, set forceLoadMap to true
  const handleLoadMapClick = () => {
    setForceLoadMap(true);
  };

  return (
    <div className={styles['Home']}>
      {createPortal(<EnableNotification />, document.getElementById('root') as HTMLElement)}
      <Navbar />
      <Header userName={data?.userName} />
      {/* Render the Map if the location is ready or if the user has requested to load the map */}
      {isLocationReady || forceLoadMap ? (
        <Map location={transformedLocation || { lat: 36.18811, lng: -115.176468 }} posts={posts} />
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
        </div>
      )}
    </div>
  );
}
