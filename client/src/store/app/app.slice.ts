import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Location } from 'src/hooks/useLocation';

// interface detailing the type of the app state
interface appState {
  location: Location | null;
}

// inital state that the app has
const initialState: appState = {
  location: null,
};

// creates a slice for our app. Actions are inside reducers
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

// Available actions to dispatch
export const AppActions = {
  setLocation: appSlice.actions.setLocation,
};
