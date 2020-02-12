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

// import concludedStates from './election-data/analytics/utils/'

console.log(analytics.cunaSupportSuccessRate());

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
      <div className="App">
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
        <Modal
          visible={this.state.modalVisible}
          title={
              !this.state.selectedState.resultFinal
              ? <div><h1>{this.state.selectedState.fullName}</h1></div>
              : <div><h1>{this.state.selectedState.fullName}</h1>2020 Statewide Primary Results</div>
          }
          onCancel={this.handleCancel}
          footer={[  // put legend here...
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
      {
          <div style={{ display: 'flex' }}>
            <div>
              <div style={{ width: 500 }}><CunaCandidateSuccess/></div>
            </div>
          </div>
      }


      </div>
    );
  }
}

export default App;
