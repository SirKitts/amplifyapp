import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import './assets/css/mysass.scss';

import Car from './components/test/car.js';
import GetUser from './components/helpers/getdata.js';
import Menu from './components/common/menu.js';

const Routers = () => {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Switch>
          <Route path="/car">
            <Car />
          </Route>
          <Route path="/users">
            <GetUser />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Routers;
