import React, { Component } from 'react';

import './styles/foundation.min.css';
import './styles/custom.css';
import Routes from './routes';
import Header from './components/Header/Header';
import MobileHeader from './components/MobileHeader/MobileHeader';


class App extends Component {

  constructor() {
    super();
    this.state = {
      appName: "Notas",
      home: false
    }
  }

  render() {
    return (
      <div className="off-canvas-wrapper">
        <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
          <div className="off-canvas-content" data-off-canvas-content>
            <MobileHeader name={this.state.appName} />
            {this.state.home && <Header name={this.state.appName} />}
            <Routes name={this.state.appName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
