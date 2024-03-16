/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState } from "react";

export const getAccessToken = () => {
  const localAccessToken = localStorage.getItem('accessToken');
  return localAccessToken !== null ? JSON.parse(localAccessToken) : null;
};

export const setAccessToken = (token: any) => localStorage.setItem('accessToken', JSON.stringify(token));

export const useLocalState = (defaultValue: any, key: string) => {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);

    return localValue !== null ? JSON.parse(localValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}