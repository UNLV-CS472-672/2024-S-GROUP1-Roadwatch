import { RootState } from '../store';

export const selectLocation = (state: RootState) => state.app.location;
