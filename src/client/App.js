import React, { Component } from 'react';
import NavBar from './components/Navbar/NavBar';
import Search from './components/Search/Search';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    return (
        <div>
          <NavBar />
          <Search />
        </div>
    );
  }
}
