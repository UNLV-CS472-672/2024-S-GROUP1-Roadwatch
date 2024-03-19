import { AppActions } from '@/store/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export type Location = {
  latitude: number;
  longitude: number;
  accuracy: number;
  timeStamp: number;
};

export const useLocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
