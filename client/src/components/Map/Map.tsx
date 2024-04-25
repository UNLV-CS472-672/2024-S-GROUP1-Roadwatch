import { useEffect, useState } from 'react';
import styles from './Map.module.scss';
import { useNavigate } from 'react-router-dom';

// Initialize initMap as a global function
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

interface Location {
  lat: number;
  lng: number;
}

interface Post {
  id: string;
  location: Location;
}

interface MapProps {
  location: Location;
  posts: Post[];
}

const Map: React.FC<MapProps> = ({location, posts}) => { // Add posts to the destructured props
  const navigate = useNavigate();

  useEffect(() => {
    const initMap = async () => {
      // Ensure the Google Maps API script has loaded
      if (!window.google || !window.google.maps) {
        console.error('Google Maps API script not loaded yet.');
        return;
      }

      // Use the location prop for setting the map center
      const position = { lat: location.lat, lng: location.lng };

      // Import the Google Maps library and AdvancedMarkerElement
      const { Map } = await window.google.maps.importLibrary('maps');
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');

      // Map initialization
      const map = new Map(document.getElementById('map'), {
        zoom: 15,
        center: position,
        mapId: 'ROADWATCH_MAP_ID',
      });

      // Create a marker for each post
      posts.forEach(post => {
        const markerPosition = { lat: post.location.lat, lng: post.location.lng };

        // eslint-disable-next-line
        const marker = new AdvancedMarkerElement({
          // eslint-disable-next-line
          map: map,
          // eslint-disable-next-line
          position: markerPosition,
          title: 'Post Marker',
        });

        // Add a click event listener to the marker
        // eslint-disable-next-line
        marker.addListener('click', async () => {
          const response: Response = await fetch(`/markers/${post.id}/post`);
          if (!response.ok) {
            console.error(`Error fetching post: ${response.statusText}`);
            return;
          }

          // eslint-disable-next-line
          const postData = await response.json();
          // eslint-disable-next-line
          navigate(`/posts/${postData.id}`);
        });
      });
    };

    // Dynamically load the Google Maps script
    const loadGoogleMapsScript = () => {
      const scriptId = 'google-maps-script';

      // Check if the script is already loaded or if the script tag already exists
      if (window.google && window.google.maps) {
        window.initMap();
        return;
      } else if (!document.getElementById(scriptId)) {
        // Only proceed to add the script if it doesn't already exist
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;

        script.onerror = () => console.error('Google Maps script failed to load.');

        document.head.appendChild(script);
      }
      window.initMap = initMap;
    };

    loadGoogleMapsScript();
  }, [location, posts]); // Add posts to the dependency array

  const actions = [
    { icon: <LocationOnIcon />, name: 'Location' },
    // Add more actions as needed
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles['mapContainer']}>
      <div id="map"></div>
      <SpeedDial
        icon={<SpeedDialIcon />}
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 80, right: 24 }}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
        classes={{ root: styles.customSpeedDial }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Map;