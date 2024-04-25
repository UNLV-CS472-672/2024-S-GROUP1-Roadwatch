import Styles from './Instructions.module.scss';
import Carousel from 'react-material-ui-carousel';
import { CustomButton } from '@/components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';
import instruct1 from '../../assets/InstructionPage_1.png';
import instruct4 from '../../assets/markers/CarAccident.svg';
import instruct2 from '../../assets/markers/Cone.svg';
import instruct3 from '../../assets/markers/Pothole.svg';
import instruct5 from '../../assets/markers/RoadDamage.svg';
import instruct6 from '../../assets/markers/WarningSign.svg';

interface Item {
  name: string;
  description: string;
  imageUrl: string;
}

function Instructions() {
  const items: Item[] = [
    // Array of items for the carousel
    {
      name: 'Instructions  #1',
      description: 'Tap on your location',
      imageUrl:
        instruct1,
    },
    {
      name: 'Instructions  #2',
      description: 'Click to report a construction zone',
      imageUrl:
      instruct2,
    },
    {
      name: 'Instructions  #3',
      description: 'Click to report a pothole',
      imageUrl:
        instruct3,
    },
    {
      name: 'Instructions  #4',
      description: 'Click to report a car accident',
      imageUrl:
        instruct4,
    },
    {
      name: 'Instructions  #5',
      description: 'Click to report road damage',
      imageUrl:
        instruct5,
    },
    {
      name: 'Instructions  #6',
      description: 'Click to report a hazard',
      imageUrl:
        instruct6,
    },
  ];

  const navigate = useNavigate(); // initialize useNavigate

  const navigateHome = () => {
    // Function to navigate to the Home page
    try {
      navigate('/home'); // Navigate to the Home page
    } catch (err) {
      // Log any errors to the console
      console.log(err);
    }
  };

  return (
    <div className={Styles['Instructions__container']}>
      {/* Main container for the Instructions component */}
      <div className={Styles['Instructions__center']}>
        {/* Centered container for the logo and carousel */}
        <img src={logo} alt={'Roadwatch'} className={Styles['Instructions__cimage']} data-testid={'Instructions-logo'} />
        <div className={Styles['Instructions__whiteContainer']}>
          {/* Container for the carousel and button */}
          <div data-testid={'Instructions-carousel'}>
          <Carousel
            navButtonsAlwaysInvisible={true} // Hide navigation buttons
            autoPlay={false} // Disable auto-play
            className={Styles['Instructions__cimage']}
            indicatorIconButtonProps={{
              style: {
                color: 'grey', // Set color for inactive indicators
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                color: '#fb7111', // Set color for active indicators
              },
            }}
          >
            {/* Mapping through items to render carousel items */}
            {items.map((item, i) => (
              <Item
                key={i}
                name={item.name}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            ))}
          </Carousel>
          </div>
          <div style={{ marginTop: '20px' }} data-testid={'Instructions-button'} >
            {/* Button component with onClick event to navigate */}
            <CustomButton onClick={navigateHome}> Lets Go! </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ name, description, imageUrl }: Item) {
  // Item component to render carousel items
  return (
    <div className={Styles['Instructions__item']}>
      {/* Individual carousel item */}
      <img src={imageUrl} alt={name} className={Styles['Instructions__cimage']} />
      {/* Image for the item */}
      <h2> {description} </h2>
      {/* Description for the item */}
    </div>
  );
}

export default Instructions;
