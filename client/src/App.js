import React, { Component } from 'react';
import './App.css';
import API from './utils/API';


class App extends Component {

  testIt = (event) => {
    event.preventDefault();
    var names = [document.getElementById('name1').value]
    API.doIt({names});
    alert('testing!');
}

  render() {
    return (
      <div className="App">
        <input type='text' id='name1' placeholder='Enter a name...' />
        <button type='submit' onClick={this.testIt}>1</button>
        <input type='text' id='name2' placeholder='Enter a name...' />
        <button type='submit' onClick={this.testIt}>2</button>
      </div>
    );
  }
}

export default App;
