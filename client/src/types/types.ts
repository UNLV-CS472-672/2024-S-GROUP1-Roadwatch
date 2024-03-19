export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  city?: string;
  address?: string;
  state?: string;
  zip?: string;
}

export interface Auth {
  user_id: string;
  access_token: string;
}
