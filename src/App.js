/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react';
import USAMap from "./components/react-usa-map/src/index"; // 'react-usa-map
import 'antd/dist/antd.css';
import { Modal, Row, Col } from 'antd';
import electionData from './election-data/';
import stateFullName from './utils/stateFullName';
import stateFillColor from './components/stateFillColor';
import { CunaCandidateSuccess } from './components/charts/Pie';
import analytics from './election-data/analytics';
import StateResultView from './components/StateResultView';
import mapLegend from './Assets/map-legend.jpg'
import ModalFooter from './components/ModalFooter';


const wideScreen = window.innerWidth >= 900;
const mediumScreen = window.innerWidth > 560 && window.innerWidth < 900;
const narrowScreen = window.innerWidth <= 560;

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
    wideScreen: window.innerWidth >= 900,
    mediumScreen: window.innerWidth > 560 && window.innerWidth < 900,
    narrowScreen: window.innerWidth <= 560,
    analytics: {
    }
  };

  componentDidMount = async () => {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

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

  resize = () => {
    if (window.innerWidth >= 900) {
      if (!this.state.wideScreen) {
        window.location.reload();
      }
      this.setState({
        wideScreen: true,
        mediumScreen: false,
        narrowScreen: false
      });
    } else if (window.innerWidth <= 560) {
      if (!this.state.narrowScreen) {
        window.location.reload();
      }
      this.setState({
        wideScreen: false,
        mediumScreen: false,
        narrowScreen: true
      });
    } else if (window.innerWidth > 560 && window.innerWidth < 900) {
      if (!this.state.mediumScreen) {
        window.location.reload();
      }
      this.setState({
        wideScreen: false,
        mediumScreen: true,
        narrowScreen: false
      });
    }
  }


  render() {
    console.log(window.innerWidth);
    console.log(this.state.wideScreen ? 'wideScreen' : this.state.mediumScreen ? 'mediumScreen' : 'narrowScreen');
    return (
      <div  style={{ marginTop: -75, marginRight: 0, /*width: '100%'*/ display: 'block' }}>

          <div>
            <div>
              <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler}/>
              </div>

            {/* <a href="https://www.cuna.org/Advocacy/Actions/Elections/2020-Elections/"
            style={{ color: "red", textDecoration: "underline", marginLeft: 20, fontSize: 10, marginTop: 0 }}>
              View full list of results by state
            </a>
            <img alt="legend" style={{ float: "right", width: wideScreen ? 80 : 50, marginBottom: 0 }} src={mapLegend}/> */}


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
          <div className="infopanel"
            style={{
              width: '100%',// this.state.narrowScreen ? 400 : 255,
              backgroundColor: '#f2f2f2',
              // marginTop: this.state.narrowScreen ? 40 : 0,
              marginLeft: 'auto', // this.state.narrowScreen ? 'auto' : 0,
              marginRight: 'auto',// this.state.narrowScreen ? 'auto' : 0,
              // display: 'block', // none
              // justifyContent: 'center'
              display: 'block',
              flexFlow: 'row wrap'
            }}
          >

              <div className="infopanel-container"
                style={{
                  width: '100%',
                  marginLeft: 'auto',// this.state.narrowScreen ? 100 : 20,
                  paddingRight: 'auto',
                  display: 'flex',
                  // justifyContent: 'space-between'
                }}
              >
                <div className="text"
                  style={{
                    width: '100%',
                    maxWidth: 200,
                    paddingTop: 10
                  }}
                >
                  <h4
                    style={{
                      fontSize: 20,
                      marginTop: '20%',
                      marginLeft: '30%', // this.state.narrowScreen ? -22 :-22
                    }}
                  >
                        <b>Primary wins to date</b></h4>
                  <p
                    style={{
                      fontSize: 12,
                      marginTop: '5%',
                      marginLeft: '30%',// this.state.narrowScreen ? 0 : -22,
                      textAlign: 'middle',
                      // width: '100%',
                      // maxWidth: 190
                      order: 1,
                      flex:'0 1 500px'
                    }}
                  >
                    From Super Tuesday to Election Day, here is a look at our
                    progress in securing a credit union majority in November.
                  </p>
                </div>

                <div style={{ backgroundColor: '#f2f2f2', fontSize: 15, display: 'block' }}>
                    <div
                      style={{
                         marginTop: 22,
                         width: '100%',
                         mindWidth: 0,
                         maxWidth: 195,
                         display: 'block',
                         leftMargin: '15%',
                         backgroundColor: "white",
                         border: '0.75px solid gray'
                      }}><CunaCandidateSuccess/>
                    </div>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 200,
                      marginLeft: this.state.narrowScreen ? -40 : -40
                    }}

                  >
                    *As of {electionData.resultTracker.currentDate}
                  </div>
                </div>
                {/* end of chart */}
                <div
                  style={{
                    mareginLeft: '16%',
                    marginRight: '7%',
                    width: '100%',
                    maxWidth: 195,
                  }}
                >
                  <table
                    style={{
                      marginTop: 22,
                    }}
                  >
                      <tr style={{ height: 20, backgroundColor: "white" }}>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr
                        style={{
                          fontSize: 50,
                          fontWeight: 700,
                          padding: "auto",
                          backgroundColor: 'white',
                          overflow: "hide" }}
                      >
                        <td
                          style={{  width: "50%", color: '#42c393', padding: '15%', /*border: "solid" */ borderRight: '1px dotted #CCCCCC' }}
                        >
                            {analytics.cunaSupportSuccessRate().totalRaces}
                        </td>
                        <td
                          style={{ color: 'steelblue', padding: '15%' /*border: "solid" */}
                        }>
                            {analytics.cunaSupportSuccessRate().wonRaces}</td>
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
