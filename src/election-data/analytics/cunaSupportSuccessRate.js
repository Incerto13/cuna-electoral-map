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
  const losers = [];
  for (let state of concludedStates()) {
    for (let candidate of cunaCandidates[state]) {
      if (candidate.winner) {
        winners.push(candidate);
      }
      else if (!candidate.winner && !candidate.openSeat && !candidate.runOff) {
        losers.push(candidate);
      }
    }
  }
  const results = {
    totalRaces: losers.length + winners.length,
    wonRaces: winners.length,
    successRate: (winners.length / (losers.length + winners.length)).toFixed(2) * 100
  };
    return results;

}

export default cunaSupportSuccessRate;
