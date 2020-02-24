/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react';
import USAMap from "./components/react-usa-map/src/index"; // 'react-usa-map
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import electionData from './election-data/';
import stateFullName from './utils/stateFullName';
import stateFillColor from './components/stateFillColor';
import { CunaCandidateSuccess } from './components/charts/Pie';
import analytics from './election-data/analytics';
import StateResultView from './components/StateResultView';
import mapLegend from './Assets/map-legend.jpg'


class App extends Component {
  state = {
    loading: false,
    modalVisible: false,
    stateData: '',
    selectedState: {
      fullName: '',
      abbrName: '',
      resultFinal: false,
      primaryDate: ''
    },
    analytics: {
    }
  };

  /* mandatory */
  mapHandler = (event) => {
    const state = event.target.dataset.name;
    this.setState({
      selectedState: {
        fullName: stateFullName[state],
        abbrName: state,
        resultFinal: electionData.resultTracker[state].resultFinal,
        primaryDate: electionData.resultTracker[state].primaryDate
      },
    }, () => {
        this.setState({
        modalVisible: true
      });
    });
  };

  statesCustomConfig = () => {
    return stateFillColor;
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };


  render() {
    return (
      <div className="body" style={{ display: 'flex' }}>
          <div className="App">
            <div><USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler}/></div>
            <img style={{ float: "right", width: 100 }} src={mapLegend}/>
            <br/>
            <br/>
            <a href="https://www.cuna.org/elections2020/"
              style={{ color: "red", textDecoration: "underline", marginLeft: 20 }}>
                View full list of results by state
            </a>

            <Modal
              visible={this.state.modalVisible}
              title={
                  !this.state.selectedState.resultFinal
                  ? <div><h1>{this.state.selectedState.fullName}</h1></div>
                  : <div><h1>{this.state.selectedState.fullName}</h1>2020 Statewide Primary Results</div>
              }
              onCancel={this.handleCancel}
              footer={[
              ]}
            >

              { this.state.modalVisible &&

                (
                  this.state.selectedState.resultFinal &&

                      (
                        <StateResultView state={this.state.selectedState.abbrName}/>
                      )
                  ||
                      <div>Statewide primary occurs on <b>{this.state.selectedState.primaryDate}</b></div>
                )

              }
            </Modal>

          {/* Charts begin here */}
          </div>

          <div className="infopanel" style={{ width: 400, backgroundColor: '#f2f2f2' }}>
              <div style={{ marginLeft: 30 }}>
                <div className="text" style={{ maxWidth: 300 }}>
                  <h2><b>Primary wins to date</b></h2>
                  <p>
                    From Super Tuesday to Election Day, here is a look at our
                    progress in securing a credit union majority in November.
                  </p>
                </div>

                <div style={{ backgroundColor: '#f2f2f2' }}>
                  <div>
                    <div style={{ width: 250, backgroundColor: "white" }}><CunaCandidateSuccess/></div>
                  </div>
                  *As of {electionData.resultTracker.currentDate}
                </div>
                {/* end of chart */}
                <div>
                  <table style={{ width: 250, marginTop: 30 }}>
                      <tr style={{ height: 15, backgroundColor: "white" }}>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr style={{fontSize: 50, fontWeight: 700, height: 2, backgroundColor: 'white', borderCollapse: "collapse" }}>
                        <td style={{  width: "50%", color: '#42c393', paddingLeft: 15,  /*border: "solid" */ borderRight: '1px dotted #CCCCCC' }}>{analytics.cunaSupportSuccessRate().totalRaces}</td>
                        <td style={{ color: 'steelblue', paddingLeft: 15, /*border: "solid" */}}>{analytics.cunaSupportSuccessRate().wonRaces}</td>
                      </tr>
                      <tr style={{ height: 15, fontSize: 10, backgroundColor: "white", overflow: "hidden" }}>
                        <td style={{ paddingLeft: 15, borderRight: '1px dotted #CCCCCC' }}>candidates supported</td>
                        <td style={{ paddingLeft: 15 }}>candidates won</td>
                      </tr>
                      <tr style={{ height: 15, backgroundColor: "white" }}>
                        <td></td>
                        <td></td>
                      </tr>
                  </table>
                </div>
              </div>
          </div>
      </div>

    );
  }
}

export default App;
