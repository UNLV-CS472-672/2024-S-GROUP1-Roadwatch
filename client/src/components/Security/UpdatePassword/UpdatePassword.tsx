import React, { useState } from 'react';
import { useUpdatePasswordMutation, useGetUserQuery } from '@/store';
import { CustomButton, PasswordField } from '@/components';
import styles from './UpdatePassword.module.scss';

interface UpdatePasswordProps {}

const UpdatePassword: React.FC<UpdatePasswordProps> = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const { data: user, error: userError, isLoading: userLoading } = useGetUserQuery();
  const [updatePassword, { isLoading: isUpdating }] = useUpdatePasswordMutation();

  const handleUpdatePassword = async () => {
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage("New passwords don't match.");
      return;
    }

    if (!user?.id) {
      setMessage("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await updatePassword({
        id: user.id,
        currentPassword,
        newPassword,
      }).unwrap();

      // Update the message state with the server response
      setMessage(response.message);

      if (response.message === "Password updated successfully") {
        // Clear the input fields if the update was successful
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (apiError: any) {
      // Handle potential errors from the API call
      setMessage(apiError.data?.message || "Failed to update password. Please try again.");
    }
  };

  // Display a loading state or an error message if applicable
  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>Error fetching user data.</p>;

  return (
    <div className={styles['page_container']}>
      <h1>Update Password</h1>
      {message && <p className={styles[message === "Password updated successfully" ? 'success_message' : 'error_message']}>{message}</p>}
      <div className={styles['field_container']}>
        <PasswordField header="Current Password" setInputValue={setCurrentPassword} />
        <PasswordField header="New Password" setInputValue={setNewPassword} />
        <PasswordField header="Confirm New Password" setInputValue={setConfirmPassword} />
        <CustomButton onClick={handleUpdatePassword} disabled={isUpdating || userLoading}>
          Update Password
        </CustomButton>
      </div>
    </div>
  );
}

export default UpdatePassword;
