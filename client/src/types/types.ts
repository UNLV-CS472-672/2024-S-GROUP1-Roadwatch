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
  notificationSubscriptions?: string[];
}

export interface Auth {
  user_id: string;
  access_token: string;
}

export interface ISendNotificationRequestBody {
  id: string;
  title: string;
  options?: NotificationOptions;
}

export interface ISubscription {
  id: string;
  subscription: PushSubscription;
}
