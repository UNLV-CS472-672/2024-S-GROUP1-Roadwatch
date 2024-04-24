import React, { useState } from 'react';

import { Header, Navbar, UserProfileUpdate, UpdatePassword } from '@/components'; // Assuming you have an AccountSettings component
import styles from './SettingsPage.module.scss';

import ProfileIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Shield';

export default function SettingsPage(): JSX.Element {
  const [activeComponent, setActiveComponent] = useState<string>('');

  // Function to handle component switching
  const handleComponentClick = (componentName: string): void => {
    setActiveComponent(componentName);
  };

  // Function to render the active component dynamically
  const renderActiveComponent = (): JSX.Element => {
    switch (activeComponent) {
      case 'ProfileSettings':
        return <UserProfileUpdate userId={''} />;
      case 'SecuritySettings':
        return <UpdatePassword />;
      default:
        return <div>Select an option!</div>;
    }
  };

  return (
    <div>
      <Header />

      <div className={styles['SettingsPage__grid_container']}>
        <div className={styles['SettingsPage__two_column_grid']}>
          <div className={styles['SettingsPage__two_column_grid_item__menu']}>
            <h1>Settings</h1>
            <div className={styles['SettingsPage__menu_container']}>
              
              <div
                className={styles['SettingsPage__menu_item']}
                role="button"
                onClick={() => handleComponentClick('ProfileSettings')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleComponentClick('ProfileSettings');
                  }
                }}
              >
                <ProfileIcon />
                <p>Profile Settings</p>
              </div>

              <div
                className={styles['SettingsPage__menu_item']}
                role="button"
                onClick={() => handleComponentClick('SecuritySettings')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleComponentClick('SecuritySettings');
                  }
                }}
              >
                <SecurityIcon />
                <p>Account Security</p>
              </div>
              
            </div>
          </div>
          <div className={styles['SettingsPage__two_column_grid_item']}>
            <div className={styles['SettingsPage__component_container']}>
              {renderActiveComponent()}
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
}
