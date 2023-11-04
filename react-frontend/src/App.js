import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListPeopleComponent from './components/ListPeopleComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreatePersonComponent from './components/CreatePersonComponent';
import UpdatePeopleComponent from './components/UpdatePeopleComponent';
import ViewPeopleComponent from './components/ViewPeopleComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListPeopleComponent}></Route>
                          <Route path = "/people" component = {ListPeopleComponent}></Route>
                          <Route path = "/add-people/:id" component = {CreatePersonComponent}></Route>
                          <Route path = "/view-people/:id" component = {ViewPeopleComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
