import { RootState } from '../store';

// retrieves the current location state
export const selectLocation = (state: RootState) => state.app.location;
