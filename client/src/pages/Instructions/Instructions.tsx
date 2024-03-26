import Styles from './Instructions.module.scss';
import Carousel from 'react-material-ui-carousel';
import { CustomButton } from '@/components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';
//import image1 from './images/image1.svg';
//import image2 from './images/image2.svg';
//import image3 from './images/image3.svg';

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
      description: 'Description for Image 1',
      imageUrl:
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image URL
    },
    {
      name: 'Instructions  #2',
      description: 'Description for Image 2',
      imageUrl:
        'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image URL
    },
    {
      name: 'Instructions  #3',
      description: 'Description for Image 3',
      imageUrl:
        'https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image URL
    },
  ];

  const navigate = useNavigate(); // initialize useNavigate

  const navigateHome = () => {
    // Function to navigate to the Home page
    try {
      navigate('/'); // Navigate to the Home page
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
        <img src={logo} alt={'Roadwatch'} className={Styles['Instructions__cimage']} />
        <div className={Styles['Instructions__whiteContainer']}>
          {/* Container for the carousel and button */}
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
          <div style={{ marginTop: '20px' }}>
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
