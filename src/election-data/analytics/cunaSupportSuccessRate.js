import cunaCandidates from '../cunaCandidates';
import resultTracker from '../resultTracker';


export const concludedStates = () => {
  // grab all concluded states from resultTracker object
  const concludedStates = [];
  for (let [state, value] of Object.entries(resultTracker)) {
    if (value.resultFinal) {
      concludedStates.push(state);
    }
  }
  return concludedStates;
}

const cunaSupportSuccessRate = () => {
  const winners = [];
  const supportedCandidates = [];
  for (let state of concludedStates()) {
    for (let candidate of cunaCandidates[state]) {
      if (candidate.winner) {
        winners.push(candidate);
      }
      supportedCandidates.push(candidate);
    }
  }
  return (winners.length / supportedCandidates.length).toFixed(2) * 100;
}

export default cunaSupportSuccessRate;
