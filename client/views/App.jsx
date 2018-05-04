import React from 'react';
// import { Link } from 'react-router-dom';
import Routes from '../route/router';
import AppBar from '../views/layout/app-bar';

class App extends React.Component {
  componentDidMount() {
    // to
  }
  render() {
    return [<AppBar key="app-bar" />, <Routes key="route" />];
  }
}

export default App;
