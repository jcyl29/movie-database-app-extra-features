import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import MovieDetails from './components/MovieDetails';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/movie/*" component={MovieDetails} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
