import { useEffect, useState } from 'react';
import styles from './Map.module.scss';
import cone from '../../assets/markers/Cone.svg';
import pothole from '../../assets/markers/Pothole.svg';
import roadDamage from '../../assets/markers/RoadDamage.svg';
import carAccident from '../../assets/markers/CarAccident.svg';
import warning from '../../assets/markers/WarningSign.svg';
import roadblock from '../../assets/markers/Roadblock.svg';
import { IMarker } from '@/types';

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

interface MapProps {
  location: Location;
  markers: IMarker[] | undefined;
}

const Map: React.FC<MapProps> = ({ location, markers }: MapProps) => {
  const [map, setMap] = useState();

  useEffect(() => {
    const initMap = async () => {
      // Ensure the Google Maps API script has loaded

      if (!window.google) {
        console.error('Google Maps API script not loaded yet.');
        return;
      }

      if (!window.google.maps) {
        console.error('Google Maps API script not loaded yet.');
        return;
      }

      // Use the location prop for setting the map center and marker
      const position = { lat: location.lat, lng: location.lng };

      // Import the Google Maps library and AdvancedMarkerElement
      const { Map } = await window.google.maps.importLibrary('maps');

      // Map initialization
      const newMap = new Map(document.getElementById('map') as HTMLElement, {
        zoom: 15,
        center: position,
        mapId: 'ROADWATCH_MAP_ID',
        disableDefaultUI: true,
      });

      setMap(newMap);

      //Test marker
      // new AdvancedMarkerElement({
      //   map: map,
      //   position: position,
      //   title: 'Test Marker',
      // });

      // Check if markers exist and are an array
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

  useEffect(() => {
    if (!window.google) return;
    if (!window.google?.maps) return;
    if (!markers) return;

    const svgToTypeMap = {
      carAccident: {
        source: carAccident,
        color: '#C70039',
      },
      cone: {
        source: cone,
        color: '#555555',
      },
      pothole: { source: pothole, color: '#8F65AB' },
      closure: { source: roadblock, color: '#ECCC37' },
      roadDamage: { source: roadDamage, color: '#58AC62' },
      default: { source: warning, color: '#405CD8' },
      sbump: { source: warning, color: '#405CD8' },
      xwalk: { source: warning, color: '#405CD8' },
      warningSign: { source: warning, color: '#405CD8' },
    };

    const resolveSVGs = async (type: keyof typeof svgToTypeMap) => {
      const parser = new DOMParser();
      const { PinElement } = (await window.google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;
      const svg = await fetch(svgToTypeMap[type].source);
      const svgText = await svg.text();
      const svgString = parser.parseFromString(svgText, 'image/svg+xml').documentElement;

      return new PinElement({
        glyph: svgString,
        background: svgToTypeMap[type].color,
        borderColor: 'black',
        scale: 2,
      }).element;
    };

    window.google.maps.importLibrary('marker').then(({ AdvancedMarkerElement }) => {
      // Your existing map initialization code...
      markers.forEach((marker) => {
        resolveSVGs(marker.type)
          .then((markerIcon) => {
            new AdvancedMarkerElement({
              map,
              position: { lat: marker.latitude, lng: marker.longitude },
              title: marker.type,
              content: markerIcon,
            });
          })
          .catch((e) => console.error(e));
      });
    });
  }, [markers, map]);

  return <div id="map" className={styles['mapContainer']}></div>;
};

export default Map;
