import Styles from './Instructions.module.scss';
import Carousel from 'react-material-ui-carousel';
import { Button } from '@mui/material';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';
//import image1 from './images/image1.jpg';
//import image2 from './images/image2.jpg';
//import image3 from './images/image3.jpg';

interface Item {
  name: string;
  description: string;
  imageUrl: string;
}

function Instructions() {
  const items: Item[] = [
    {
      name: 'Instructions  #1',
      description: 'Description for Image 1',
      imageUrl:
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Instructions  #2',
      description: 'Description for Image 2',
      imageUrl:
        'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Instructions  #3',
      description: 'Description for Image 3',
      imageUrl:
        'https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div>
      <img src={logo} alt={'Roadwatch'} className={Styles['Instructions__image']} />

      <h1> Roadwatch </h1>

      <Carousel>
        {items.map((item, i) => (
          <Item key={i} name={item.name} description={item.description} imageUrl={item.imageUrl} />
        ))}
      </Carousel>
    </div>
  );
}

function Item({ name, imageUrl }: Item) {
  return (
    <div className={Styles['Instructions__item']}>
      <h2> Instructions </h2>
      <img src={imageUrl} alt={name} className={Styles['Instructions__image']} />
    </div>
  );
}

export default Instructions;
