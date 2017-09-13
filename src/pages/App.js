import React, { Component } from 'react';
import Header from '../componts/header'
import User from './user/'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <User/>
      </div>
    );
  }
}

export default App;
