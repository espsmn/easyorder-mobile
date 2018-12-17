import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import Receipt from '../pages/Receipt';
import Home from '../pages/Home/Homescreen';
import Restaurantsscreen from '../pages/Restaurants/Restaurantsscreen';
import Details from '../pages/DetailPage/Details';
import themes from '../styles/theme.style';
import Angebot from '../pages/Angebot';

const Route = createStackNavigator(
{
  Home: {screen: Home},
  Restaurantsscreen: {screen: Restaurantsscreen},
  Details: {screen: Details},
  Products: { screen: Products},
  Checkout: { screen: Checkout},
  Receipt: { screen: Receipt},
  Angebot: { screen: Angebot}


},{
 headerMode: 'none'
}
);

export default Route;