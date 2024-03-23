import React, { useEffect } from 'react';
import styles from './Map.module.scss';

// Initialize initMap as a global function
declare global {
  interface Window {
    initMap: () => void;
  }
}

interface Location {
  lat: number;
  lng: number;
}

interface MapProps {
  location: Location;
}


const Map: React.FC<MapProps> = ({location}) => {
  useEffect(() => {
    const initMap = async () => {
      // Ensure the Google Maps API script has loaded
      if (!window.google || !window.google.maps) {
        console.error('Google Maps API script not loaded yet.');
        return;
      }

      // Use the location prop for setting the map center and marker
      const position = { lat: location.lat, lng: location.lng };

      // Import the Google Maps library and AdvancedMarkerElement
      const { Map } = await google.maps.importLibrary('maps');
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

      // Map initialization
      const map = new Map(document.getElementById('map'), {
        zoom: 15,
        center: position,
        mapId: 'ROADWATCH_MAP_ID',
      });

      // Test marker
      new AdvancedMarkerElement({
        map: map,
        position: position,
        title: 'Test Marker',
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
  }, [location]); // Dependency array to re-run the effect if the location prop changes

  return <div id="map" className={styles['mapContainer']}></div>;
};

export default Map;
