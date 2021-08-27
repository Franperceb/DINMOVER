import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
      </Switch>
    </Router>
  );
};

export default App;
