import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../route/router';

class App extends React.Component {
  componentDidMount() {
    // to
  }
  render() {
    return [
      <div>
        <Link to="/">首页</Link>
        <Link to="/detail">详情</Link>
      </div>,
      <Routes />,
    ];
  }
}

export default App;
