import React, { Component } from 'react';
import USAMap from "./components/react-usa-map/src/index"; // 'react-usa-map
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import electionData from './election-data/';
import stateFullName from './utils/stateFullName';
import stateFillColor from './components/stateFillColor';
import cunaCandidates from './election-data/cunaCandidates';

class App extends Component {
  state = {
    loading: false,
    visible: false,
    stateData: '',
    selectedState: {
      fullName: '',
      abbrName: '',
      resultFinal: false,
      primaryDate: ''
    }
  };

  /* mandatory */
  mapHandler = (event) => {
    const state = event.target.dataset.name;
    if (electionData.preElection[state]) {
      this.setState({
        selectedState: {
          fullName: stateFullName[state],
          abbrName: state,
          resultFinal: electionData.resultTracker[state].resultFinal,
          primaryDate: electionData.resultTracker[state].primaryDate
        },
        stateData: this.getCurrentData(state)
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

  getCurrentData = (state) => {
    if (electionData.resultTracker[state].resultFinal) {
      return electionData.postElection[state];
    } else {
      return electionData.preElection[state];
    }
  }

  isCunaCandidate = (candidate, chamber, party, district) => {
    const state = this.state.selectedState.abbrName;

    if (!cunaCandidates[state] || !cunaCandidates[state][chamber]) {
      return false;
    }

    if (chamber === 'senate') {
      if (cunaCandidates[state][chamber][party]) {
        if (cunaCandidates[state][chamber][party] === candidate) {
          return true;
        } else return false;
      } else return false;
    }

    else if (chamber === 'house') {
      if (cunaCandidates[state][chamber][district] && cunaCandidates[state][chamber][district][party]) {
        if (cunaCandidates[state][chamber][district][party] === candidate) {
          return true;
        } else return false;
      } else return false;
    }
  }

  render() {
    return (
      <div className="App">
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
        <Modal
          visible={this.state.visible}
          title={
              !this.state.selectedState.resultFinal
              ? <div><h1>{this.state.selectedState.fullName}</h1>primary on {this.state.selectedState.primaryDate} </div>
              : <div><h1>{this.state.selectedState.fullName}</h1>Primary Results</div>
          }
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
                  <div className="senate">
                  <h4>Democratic</h4>
                    <div>
                      <ul>
                        {this.state.stateData.senate.dem.map((candidate, i) => {
                          const cuna = this.isCunaCandidate(candidate, 'senate', 'dem');
                          return (
                            <li key={candidate}>{cuna ? <b>{candidate}</b> : candidate}</li>
                          );
                        })}
                      </ul>
                    </div>
                    <h4>Republican</h4>
                    <div>
                      <ul>
                        {this.state.stateData.senate.rep.map((candidate, i) => {
                          const cuna = this.isCunaCandidate(candidate, 'senate', 'rep');
                          return (
                            <li key={candidate}>{cuna ? <b>{candidate}</b> : candidate}</li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <hr/>
                </React.Fragment>
                <React.Fragment>
                  <h2>House</h2>
                  <div className="house"></div>
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
                                        const cuna = this.isCunaCandidate(candidate, 'house', 'dem', district);
                                        return (
                                          <li key={candidate}>{cuna ? <b>{candidate}</b> : candidate}</li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                  <h4>Republican</h4>
                                  <div>
                                    <ul>
                                      {this.state.stateData.house[district].rep.map((candidate, i) => {
                                        const cuna = this.isCunaCandidate(candidate, 'house', 'rep', district);
                                        return (
                                          <li key={candidate}>{cuna ? <b>{candidate}</b> : candidate}</li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                <hr/>
                              </div>
                            )
                          )
                          ||
                          <p className="house">primaries cancelled</p>
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
