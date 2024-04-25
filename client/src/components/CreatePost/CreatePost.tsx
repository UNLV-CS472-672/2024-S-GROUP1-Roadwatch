import { useState } from 'react';
import styles from './CreatePost.module.scss';
import CustomButton from '../CustomButton/CustomButton.tsx';
import CloseIcon from '@mui/icons-material/Close';
import { Fab, IconButton } from '@mui/material';
import TextField from '../TextField/TextField.tsx';
import cone from '../../assets/markers/Cone.svg';
import pothole from '../../assets/markers/Pothole.svg';
import roadDamage from '../../assets/markers/RoadDamage.svg';
import carAccident from '../../assets/markers/CarAccident.svg';
import warning from '../../assets/markers/WarningSign.svg';
import TextFieldMulti from '@mui/material/TextField';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useSavePostMutation } from '@/store/post/post.slice.ts';
import { useSelector } from 'react-redux';
import { selectLocation, selectUser } from '@/store';

// Type for the marker IDs
type MarkerId = 'cone' | 'pothole' | 'RoadDamage' | 'CarAccident' | 'WarningSign' | 'etc';

interface CreatePostParameters {
  communityId: string;
}

export default function CreatePost({ communityId }: CreatePostParameters) {
  // State Variables
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [postName, setPostName] = useState('');
  const [marker, setMarker] = useState<MarkerId | null>(null);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [savePost] = useSavePostMutation();

  const reduxLocation = useSelector(selectLocation);
  const { data: user } = useSelector(selectUser);

  // Function to handle initialize data
  const initializeData = () => {
    setPostName('');
    setMarker(null);
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
  };

  // Functions to handle input changes to each data point
  // (postName, marker, date, description, and location)
  const handlePostNameChange = (value: string) => setPostName(value);
  const handleDateChange = (value: string) => setDate(value);
  const handleDescriptionChange = (value: string) => setDescription(value);
  const markerClick = (id: string) => setMarker(id as MarkerId);

  // Function to handle post submission
  const handlePost = async () => {
    // For now it console logs the data points
    // May need to refactor for backend
    if (postName && description && date && reduxLocation) {
      if (marker) {
        const postBody = {
          community: communityId,
          user: user?.id || '',
          content: {
            title: postName,
            body: description,
          },
          marker: {
            longitude: reduxLocation.longitude,
            latitude: reduxLocation.latitude,
            type: marker,
          },
          type: 'marker',
        };
        await savePost(postBody);
      } else {
        const postBody = {
          community: communityId,
          user: user?.id || '',
          content: {
            title: postName,
            body: description,
          },
          type: 'text',
        };
        await savePost(postBody);
      }

      handleDrawerClose();
    }
  };

  // Function to handle opening the Drawer popup
  const handleDrawerOpen = () => {
    // Calls initializeData() function
    setDrawerOpen(true);
    initializeData();
  };

  // Function to handle closing the Drawer popup
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <>
      <div className={styles['CreatePost__postContainer']}>
        {/* Button to open dialog */}
        <CustomButton onClick={handleDrawerOpen}>Create Post</CustomButton>
      </div>
      {/* MUI SwipeableDrawer for creating post */}
      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        swipeAreaWidth={20}
      >
        <div className={styles['CreatePost__container']}>
          <div className={styles['CreatePost__first']}>
            {/* The title: CREATING POST */}
            <p className={styles['CreatePost__title']}>CREATE POST</p>
            {/* Button to close dialog (CloseIcon) */}
            <IconButton
              className={styles['CreatePost__backButton']}
              onClick={handleDrawerClose}
              size="small"
            >
              <CloseIcon className={styles['CreatePost__close']} />
            </IconButton>
          </div>
          <div className={styles['CreatePost__second']}>
            {/* Custom TextField for the post name */}
            <TextField header="Post Name" setInputValue={handlePostNameChange} type="postName" />
          </div>
          <div>
            <p className={styles['CreatePost__text']}>Select Marker</p>
            <div className={styles['CreatePost__buttons']}>
              {/* MUI FAB components for markers */}
              {['cone', 'pothole', 'RoadDamage', 'CarAccident', 'WarningSign'].map((id) => (
                <Fab
                  key={id}
                  className={`${styles['CreatePost__fab']} ${marker === id ? styles['CreatePost__active'] : ''}`}
                  size="large"
                  aria-label={id}
                  onClick={() => markerClick(id)}
                >
                  <img
                    className={`${styles['CreatePost__images']} ${id === 'CarAccident' ? styles['CreatePost__images2'] : ''}`}
                    src={
                      id === 'cone'
                        ? cone
                        : id === 'pothole'
                          ? pothole
                          : id === 'RoadDamage'
                            ? roadDamage
                            : id === 'CarAccident'
                              ? carAccident
                              : id === 'WarningSign'
                                ? warning
                                : ''
                    }
                    alt=""
                  />
                </Fab>
              ))}
            </div>
          </div>
          <div className={styles['CreatePost__third']}>
            <p className={styles['CreatePost__text']}>Date</p>
            {/* Date text field using input tag to capture date of post */}
            <input
              type="date"
              className={styles['CreatePost__date']}
              onChange={(change) => handleDateChange(change.target.value)}
            ></input>
          </div>
          <div className={styles['CreatePost__fourth']}>
            <p className={styles['CreatePost__text']}>Description</p>
            {/* Description field which uses MUI Multiline textfield */}
            <TextFieldMulti
              id="outlined-multiline-flexible"
              label="Description..."
              multiline
              rows={4}
              className={styles['CreatePost__multi']}
              onChange={(change) => handleDescriptionChange(change.target.value)}
            />
          </div>
          <div className={styles['CreatePost__lastButton']}>
            <CustomButton onClick={handlePost}>POST</CustomButton>
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
}
