import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Location } from 'src/hooks/useLocation';

interface appState {
  location: Location | null;
}

const initialState: appState = {
  location: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location | null>) => ({
      ...state,
      location: action.payload,
    }),
  },
});

export const AppActions = {
  setLocation: appSlice.actions.setLocation,
};
