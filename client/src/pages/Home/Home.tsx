import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { useGetUserQuery, selectLocation } from '@/store';
import { useSelector } from 'react-redux';
import { useLocation } from '@/hooks';
import { Header, Map } from '@/components';

export default function Home(): JSX.Element {
  const { data } = useGetUserQuery();
  const location = useLocation();
  const reduxLocation = useSelector(selectLocation); // Get the location from the Redux store, automatically updated when the user changes location

  // State to control the readiness of the location
  // The map will load when location is set.
  const [isLocationReady, setIsLocationReady] = useState(false);
  // State to control forcing the map to load with default location.
  const [forceLoadMap, setForceLoadMap] = useState(false);

  // Standardize the location object to match the expected format for the Map component
  const transformedLocation = reduxLocation
    ? { lat: reduxLocation.latitude, lng: reduxLocation.longitude }
    : undefined;

  useEffect(() => {
    // If the location is transformed, set the location as ready
    if (transformedLocation) {
      setIsLocationReady(true);
    }
  }, [transformedLocation]); // Depend on transformedLocation

  // When the button is clicked, set forceLoadMap to true
  const handleLoadMapClick = () => {
    setForceLoadMap(true);
  };

  return (
    <div className={styles['Home']}>
      <Header userName={data?.userName} />
      {/* Render the Map if the location is ready or if the user has requested to load the map */}
      {isLocationReady || forceLoadMap ? (
        <Map location={transformedLocation || { lat: 36.18811, lng: -115.176468 }} />
      ) : (
        // This button is only shown if the Map is not yet ready to be displayed
        <button onClick={handleLoadMapClick} className={styles['loadMapButton']}>
          Load Map Anyway
        </button>
      )}
      <h1>Logged in as {`${data?.userName}`}</h1>
    </div>
  );
}
