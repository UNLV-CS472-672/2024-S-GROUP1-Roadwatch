import { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import styles from './Home.module.scss';
import {
  useGetUserQuery,
  useLazyGetMarkersQuery,
  selectLocation,
  useSaveMarkerMutation,
  useSendNotificationMutation,
} from '@/store';
import { useSelector } from 'react-redux';
import { useLocation } from '@/hooks';
import { Header, Map, CustomButton, Navbar, EnableNotification } from '@/components';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import {
  CarAccident,
  Cone,
  Pothole,
  RoadDamage,
  Roadblock,
  WarningSign,
} from 'src/assets/markers/components';

// Image imports
import warning_marker from 'src/assets/markers/WarningSign.svg';
import { IMarker } from '@/types';
import { CircularProgress } from '@mui/material';

export default function Home(): JSX.Element {
  useLocation();
  const { data } = useGetUserQuery();
  const [sendNotification] = useSendNotificationMutation();
  // const markers = useGetMarkersQuery(undefined, { pollingInterval: 60_000 });
  const [getMarkers, markers] = useLazyGetMarkersQuery({
    pollingInterval: 60_000,
    skipPollingIfUnfocused: true,
  });
  const [createMarker] = useSaveMarkerMutation();

  const [open, setOpen] = useState(false); // Speed Dial Functions
  const handleOpen = () => setOpen(true); // Speed Dial Functions
  const handleClose = () => setOpen(false); // Speed Dial Functions

  const reduxLocation = useSelector(selectLocation); // Get the location from the Redux store, if available

  // The map will load when location is set or user asks to load.
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [forceLoadMap, setForceLoadMap] = useState(false);

  // Standardize the location object to match the expected format for the Map component
  const transformedLocation = useMemo(
    () =>
      reduxLocation ? { lat: reduxLocation.latitude, lng: reduxLocation.longitude } : undefined,
    [reduxLocation]
  );

  useEffect(() => {
    if (transformedLocation) {
      setIsLocationReady(true); // sets the location to ready.
    }
  }, [transformedLocation]); // Depend on transformedLocation

  useEffect(() => {
    const handleGetMarkers = async () => {
      await getMarkers();
    };
    handleGetMarkers().catch((e) => console.error(e));
  }, [getMarkers]);

  // When the button is clicked, set forceLoadMap to true
  const handleLoadMapClick = () => {
    setForceLoadMap(true);
  };

  const actions = [
    {
      icon: <Pothole />,
      name: 'Pothole',
      color: '#8F65AB',
      onClick: () => handleMarkerTypeSelect('pothole'),
    },
    {
      icon: <RoadDamage />,
      name: 'Road Damage',
      color: '#58AC62',
      onClick: () => handleMarkerTypeSelect('roadDamage'),
    },
    {
      icon: <CarAccident />,
      name: 'Car Accident',
      color: '#C70039',
      onClick: () => handleMarkerTypeSelect('carAccident'),
    },
    {
      icon: <Roadblock />,
      name: 'Closure',
      color: '#ECCC37',
      onClick: () => handleMarkerTypeSelect('closure'),
    },
    {
      icon: <Cone />,
      name: 'Construction',
      color: '#555555',
      onClick: () => handleMarkerTypeSelect('cone'),
    },
    {
      icon: <WarningSign />,
      name: 'Misc.',
      color: '#405CD8',
      onClick: () => handleMarkerTypeSelect('default'),
    },
    // Add more actions as needed
  ];

  const handleMarkerTypeSelect = async (type: IMarker['type']) => {
    const currLocation = transformedLocation || { lat: 36.18811, lng: -115.176468 };
    const newMarker: IMarker = {
      latitude: currLocation?.lat,
      longitude: currLocation?.lng,
      type: type,
    };
    await createMarker(newMarker).catch((e) => console.error(e));
    await getMarkers();
    await sendNotification({
      id: data?.id as string,
      title: 'Successfully created marker!',
      options: { body: 'Thank you for keeping your community safe' },
    });
    handleClose(); // Close the SpeedDial after selecting a marker type
  };

  return (
    <div className={styles['Home']}>
      {createPortal(<EnableNotification />, document.getElementById('root') as HTMLElement)}
      <Navbar />
      <Header userName={data?.userName} />
      {/* Render the Map if the location is ready or if the user has requested to load the map */}
      {isLocationReady || forceLoadMap ? (
        <Map
          markers={markers.data}
          location={transformedLocation || { lat: 36.18811, lng: -115.176468 }}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress
            sx={{
              marginBottom: '3rem',
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#FB7110',
              height: '5rem',
              width: '5rem',
            }}
          />
          <img src={warning_marker} className={styles['Home__center_image']} alt="warning icon" />
          <p className={styles['Home__alert_message']}>
            Location might not available.
            <br></br>
            Would you like to load the map anyway?
          </p>
          <div className={styles['Home__button_container']}>
            <CustomButton onClick={handleLoadMapClick}>Load Map Anyway</CustomButton>
          </div>
        </div>
      )}
      <SpeedDial
        icon={<SpeedDialIcon />}
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 125, right: 30 }}
        FabProps={{
          sx: {
            bgcolor: '#FB7110',
            '&:hover': {
              bgcolor: '#FB7110',
            },
          },
        }}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            tooltipOpen
            FabProps={{
              sx: {
                bgcolor: action.color,
              },
            }}
            sx={{
              whiteSpace: 'nowrap',
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
