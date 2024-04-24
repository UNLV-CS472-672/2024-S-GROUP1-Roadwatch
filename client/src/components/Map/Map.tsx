import { useEffect } from 'react';
import styles from './Map.module.scss';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
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

const Map: React.FC<MapProps> = ({location, posts}) => {
  const navigate = useNavigate();

  const initMap = () => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API script not loaded yet.');
      return;
    }

    const position = { lat: location.lat, lng: location.lng };

    const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 15,
      center: position,
      mapTypeId: 'ROADWATCH_MAP_ID',
    });

    posts.forEach(async post => {
      const markerPosition = { lat: post.location.lat, lng: post.location.lng };

      const marker = new window.google.maps.Marker({
        position: markerPosition,
        map: map,
        title: 'Post Marker',
      });

      marker.addListener('click', async () => {
        const response: Response = await fetch(`/markers/${post.id}/post`);
        if (!response.ok) {
          console.error(`Error fetching post: ${response.statusText}`);
          return;
        }

        const postData = await response.json();
        navigate(`/posts/${postData.id}`);
      });
    });
  };

  useEffect(() => {
    window.initMap = initMap;
    initMap();
  }, [location, posts]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const scriptId = 'google-maps-script';

      if (window.google && window.google.maps) {
        window.initMap();
        return;
      } else if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;

        script.onerror = () => console.error('Google Maps script failed to load.');

        document.head.appendChild(script);
      }
    };

    loadGoogleMapsScript();
  }, []);

  return <div id="map" className={styles['mapContainer']}></div>;
};

export default Map;