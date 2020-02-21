/* eslint react/jsx-no-comment-textnodes: 0 */
/* eslint array-callback-return: 0 */

import React from 'react';
import cunaCandidates from '../election-data/cunaCandidates';
import redCheck from '../Assets/red-checkmark.gif';
import xMark from '../Assets/x-mark.png';

const chamber = {
  senate: "Senate",
  house: "House",
};

const StateResultView = ({state}) => {

  const winOrLose = (winner) => {
    return (
        <p>
          {
            winner
            ? <img src={redCheck} alt="" style={{width: 20, float: "left", marginRight: 5}} />
            : <img src={xMark} alt="" style={{width: 12, float: "left", marginRight: 13}} />
          }
        </p>
    );
  }

  return cunaCandidates[state].map((candidate) => {
    if (candidate.chamber === "senate") {
      return (
        <div>
          {winOrLose(candidate.winner)}
          <p>{candidate.name} // {chamber[candidate.chamber]}</p>
        </div>
      );
    } else if (candidate.chamber === "house") {
      return (
          <div>
            {winOrLose(candidate.winner)}

            <p>{candidate.name} // {chamber[candidate.chamber]} // District {candidate.district}</p>
          </div>
      );
    }

  });

}
export default StateResultView;
