import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, useLocation } from "react-router-dom";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';


export default function Navbar() {

  // Hooks
  const navigate = useNavigate(); 
  let location = useLocation().pathname.substring(1);

  // if path is empty, set to home
  if(location === '') {
    location = 'home';
  }

  // if path is general-info, set to settings
  if(location === 'general-info') {
    location = 'settings';
  }

  // Sets the current value of the navbar
  const [value, setValue] = React.useState(location);

  // Handles the change of the navbar
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation 
    sx={{ 
      width: '100%', 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0,
      backgroundColor: '#f5f5f5',
    }} 
    value={value} 
    onChange={handleChange}
  >
      <BottomNavigationAction
        label="Chat"
        value="chat"
        icon={<ChatBubbleIcon />}
        onClick={() => { 
          navigate('/chat');
        }}
      />
      <BottomNavigationAction
        label="Community"
        value="community"
        icon={<PeopleIcon />}
        onClick={() => { 
          navigate('/community');
        }}
      />
      <BottomNavigationAction
        label="Map"
        value="home"
        icon={<LocationOnIcon />}
        onClick={() => { 
          navigate('/');
        }}
      />
      <BottomNavigationAction
        label="Settings"
        value="settings"
        icon={<SettingsIcon />}
        onClick={() => { 
          navigate('/general-info');
        }}
      />
    </BottomNavigation>
  );
}