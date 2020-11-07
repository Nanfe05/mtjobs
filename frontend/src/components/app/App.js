import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {Provider} from 'react-redux';
import store from '../../store/store';


import Header from './header/header';
import DrawerMenu from './drawerMenu/drawerMenu';
import Footer from './footer/footer';

import Home from '../routes/home/home';
import AboutUs from '../routes/about/aboutUs';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <DrawerMenu/>
        <Switch>
          <Route path="/aboutus"> 
            <AboutUs/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </Provider>
  );
}

export default App;
