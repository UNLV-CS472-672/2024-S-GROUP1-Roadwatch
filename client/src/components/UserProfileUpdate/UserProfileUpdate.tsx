import { useState, useEffect } from 'react';
import { useGetUserQuery, useUpdateUserProfileMutation } from '@/store';

import styles  from './UserProfileUpdate.module.scss';

interface UserProfileProps {
  userId: string;
}

export default function UserProfileUpdate({ userId }: UserProfileProps) {
  const { data: user, error, isLoading } = useGetUserQuery();
  
  const [updateUserProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  // Initialize an empty state first
  const [userData, setUserData] = useState({
    id: userId,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    city: '',
    address: '',
    state: '',
    zip: ''
  });

  const [message, setMessage] = useState('');

  // Update state when user data is fetched
  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id ?? '',
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email ?? '',
        phoneNumber: user.phoneNumber ?? '',
        dob: user.dob ?? '',
        city: user.city ?? '',
        address: user.address ?? '',
        state: user.state ?? '',
        zip: user.zip ?? ''
      });
    }
  }, [user]);

  // set userid
  userId = userData.id;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUserProfile({ id: userId, userData }).unwrap();
      setMessage('Profile updated successfully!');
    }
    catch (error: unknown) {
      setMessage('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data.</p>;

  return (
    <div className={styles['userProfileUpdate__container']}>
      <h2 className={styles['userProfileUpdate__heading']}> User Profile Update </h2>
      {message && <p className={styles[message === "Profile updated successfully!" ? 'success_message' : 'error_message']}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles['userProfileUpdate__form_container']}>
            <div className={styles['userProfileUpdate__field_wrapper']}>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  Username:
                  <input
                    type="text"
                    name="userName"
                    value={userData.userName}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  Phone Number:
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  Date of Birth:
                  <input
                    type="date"
                    name="dob"
                    value={userData.dob}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  City:
                  <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  State:
                  <input
                    type="text"
                    name="state"
                    value={userData.state}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
              <div className={styles['userProfileUpdate__field_container']}>
                <label className={styles['userProfileUpdate__field_container__label']}>
                  ZIP Code:
                  <input
                    type="text"
                    name="zip"
                    value={userData.zip}
                    onChange={handleChange}
                    className={styles['userProfileUpdate__field_container__input']}
                  />
                </label>
              </div>
            </div>
            <div>
              <button className={styles['userProfileUpdate__submit_button']} type="submit" disabled={isUpdating}>
                Update Profile
              </button>
            </div>
          </form>
    </div>
    
  );
}
