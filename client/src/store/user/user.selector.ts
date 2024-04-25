import { user } from './user.slice';

// retrieves the current location state
export const selectUser = user.endpoints.getUser.select();
