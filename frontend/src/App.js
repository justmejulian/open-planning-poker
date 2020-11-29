import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

import Form from './components/Form';
import Game from './components/Game';

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <Router>
        <Switch>
          <Route path="/:gameId">
            <Game />
          </Route>
          <Route path="/">
            <Form />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default hot(App);
