import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './components/Home/HomeScreen';
import LoginScreen from './components/Auth/LoginScreen';
import React from 'react';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/admin" component={LoginScreen} />
      </Switch>
    </Router>
  );
};

export default App;
