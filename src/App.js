import React, { Component } from 'react';
import USAMap from "./components/react-usa-map/src/index"; // 'react-usa-map
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import electionData from './election-data/';
import stateFullName from './utils/stateFullName';
import stateFillColor from './components/stateFillColor';

class App extends Component {
  state = {
    loading: false,
    visible: false,
    selectedState: '',
    stateData: ''
  };

  /* mandatory */
  mapHandler = (event) => {
    const state = event.target.dataset.name;
    if (electionData.preElection[state]) {
      this.setState({
        selectedState: stateFullName[state],
        stateData: electionData.preElection[state]
      }, () => {
         this.setState({
          visible: true
        });
      });

    } else {
        alert(`${event.target.dataset.name}: ...no data yet`);
    }
  };

  statesCustomConfig = () => {
    return stateFillColor;
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div className="App">
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
        <Modal
          visible={this.state.visible}
          title={<h1>{this.state.selectedState}</h1>}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
          ]}
        >

          { this.state.visible &&
            (
            <React.Fragment>
                <React.Fragment>
                  <h2>Senate</h2>
                  <div class="senate">
                  <h4>Democratic</h4>
                    <div>
                      <ul>
                        {this.state.stateData.senate.dem.map((candidate, i) => {
                          return (
                            <li key={candidate}>{candidate}</li>
                          );
                        })}
                      </ul>
                    </div>
                    <h4>Republican</h4>
                    <div>
                      <ul>
                        {this.state.stateData.senate.rep.map((candidate, i) => {
                          return (
                            <li key={candidate}>{candidate}</li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <hr/>
                </React.Fragment>
                <React.Fragment>
                  <h2>House</h2>
                  <div class="house"></div>
                  {Object.keys(this.state.stateData.house).map((district, i) => {
                    return (
                      <React.Fragment>
                        <h3>District {district}</h3>
                        {
                          (
                            (this.state.stateData.house[district].dem || this.state.stateData.house[district].dem)
                            &&
                            (
                                <div>
                                  <h4>Democratic</h4>
                                  <div>
                                    <ul>
                                      {this.state.stateData.house[district].dem.map((candidate, i) => {
                                        return (
                                          <li key={candidate}>{candidate}</li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                  <h4>Republican</h4>
                                  <div>
                                    <ul>
                                      {this.state.stateData.house[district].rep.map((candidate, i) => {
                                        return (
                                          <li key={candidate}>{candidate}</li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                <hr/>
                              </div>
                            )
                          )
                          ||
                          <p class="house">primaries cancelled</p>
                        }
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
            </React.Fragment>



            )
          }
        </Modal>
      </div>
    );
  }
}

export default App;
