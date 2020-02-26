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
import ModalFooter from './components/ModalFooter';

const wideScreen = window.innerWidth >= 900;
const mediumScreen = window.innerWidth > 350 && window.innerWidth < 900;
const narrowScreen = window.innerWidth <= 350;

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
  mapHandler = async (event) => {
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

  modalCustomFooter = () => {
    //const state = this.state.selectedState.abbrName;
    //const stateResults = electionData.resultTracker[state];
    // const stateNotes = stateResults.notes ? stateResults.notes : '';
    console.log('whaaaaaa?');
    console.log(electionData.resultTracker[this.state.selectedState.abbrName].notes);
  // return <p>holler again!!! {this.state.selectedState ? this.state.selectedState : 'race condition'}</p>
    // this.state.selectedState;
    // {electionData.resultTracker[this.state.selectedState.abbrName].notes}
    // return this.state.selectedState['AL'];
  };


  render() {
    console.log(window.innerWidth);
    console.log(wideScreen ? 'wideScreen' : mediumScreen ? 'mediumScreen' : narrowScreen);
    return (
      <div  style={{ width: '100%', display: !narrowScreen ? 'flex' : '' }}>
          <div>
            <div>
              <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler}/>
              </div>
            <a href="https://www.cuna.org/Advocacy/Actions/Elections/2020-Elections/"
            style={{ color: "red", textDecoration: "underline", marginLeft: 20, fontSize: 6, marginTop: 0 }}>
              View full list of results by state
            </a>
            <img alt="legend" style={{ float: "right", width: wideScreen ? 80 : 50, marginBottom: 0 }} src={mapLegend}/>


            <Modal
              visible={this.state.modalVisible}
              title={
                  !this.state.selectedState.resultFinal
                  ? <div><h1>{this.state.selectedState.fullName}</h1></div>
                  : <div>
                      <h1>{this.state.selectedState.fullName}</h1>Statewide Primary Results from {this.state.selectedState.primaryDate}
                    </div>
              }

              onCancel={this.handleCancel}
              footer={[
                this.state.modalVisible && <ModalFooter notes={electionData.resultTracker[this.state.selectedState.abbrName].notes} />
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

          <div className="infopanel" style={{ width: 200, backgroundColor: '#f2f2f2' }}>
              <div style={{ marginLeft: 20 }}>
                <div className="text" style={{ width: 200 }}>
                  <h4><b>Primary wins to date</b></h4>
                  <p style={{ fontSize: 8, textAlign: 'left', width: 150 }}>
                    From Super Tuesday to Election Day, here is a look at our
                    progress in securing a credit union majority in November.
                  </p>
                </div>

                <div style={{ backgroundColor: '#f2f2f2', fontSize: 8 }}>
                  <div>
                    <div style={{ width: 150, backgroundColor: "white" }}><CunaCandidateSuccess/></div>
                  </div>
                  *As of {electionData.resultTracker.currentDate}
                </div>
                {/* end of chart */}
                <div>
                  <table style={{ width: 150, marginTop: 30 }}>
                      <tr style={{ height: 15, backgroundColor: "white" }}>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr style={{fontSize: 50, fontWeight: 700, padding: "auto", backgroundColor: 'white', overflow: "hide" }}>
                        <td style={{  width: "50%", color: '#42c393', paddingLeft: '10%',  /*border: "solid" */ borderRight: '1px dotted #CCCCCC' }}>{analytics.cunaSupportSuccessRate().totalRaces}</td>
                        <td style={{ color: 'steelblue', paddingLeft: '10%', /*border: "solid" */}}>{analytics.cunaSupportSuccessRate().wonRaces}</td>
                      </tr>
                      <tr style={{ height: 15, fontSize: 10, backgroundColor: "white", textAlign: 'center', overflow: "hidden" }}>
                        <td style={{ padding: '0 12%, 0  12%', borderRight: '1px dotted #CCCCCC' }}>candidates supported</td>
                        <td style={{ padding: '0 12%, 0  12%' }}>candidates won</td>
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
