import { AppActions } from '@/store/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export type Location = {
  latitude: number;
  longitude: number;
  accuracy: number;
  timeStamp: number;
};

// React hook definintion
export const useLocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // retrieves the current position of the device using browser navigator
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // dispatches an action to set the location in our app's store
        dispatch(
          AppActions.setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timeStamp: position.timestamp,
          })
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }, [dispatch]);
};
