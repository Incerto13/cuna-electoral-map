/* eslint react/jsx-no-comment-textnodes: 0 */
/* eslint array-callback-return: 0 */

import React from 'react';
import cunaCandidates from '../election-data/cunaCandidates';
import greenCheck from '../Assets/green-checkmark.png';
import xMark from '../Assets/x-mark.png';
import squareBlock from '../Assets/square-block.png';
import asterisk from '../Assets/asterisk.png'

const chamber = {
  senate: "Senate",
  house: "House",
};

const StateResultView = ({state}) => {

  const winOrLose = (candidate) => {
    return (
        <p>
          {
            candidate.winner
            ? <img src={greenCheck} alt="" style={{width: 20, float: "left", marginRight: 5 }} />
            : candidate.openSeat
            ? <img src={squareBlock} alt="" style={{width: 15, float: "left", marginRight: 10, paddingBottom: -15 }} />
            // they lost
            : <img src={xMark} alt="" style={{width: 12, float: "left", marginRight: 13, paddingBottom: -35 }} />
          }
        </p>
    );
  }

  return cunaCandidates[state].map((candidate) => {

    if (candidate.chamber === "senate") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {winOrLose(candidate)}
          <p>{candidate.name} // {chamber[candidate.chamber]}</p>
        </div>
      );
    } else if (candidate.chamber === "house") {
      return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {winOrLose(candidate)}
            <p>
              {candidate.name} // {chamber[candidate.chamber]} // District {candidate.district}
              <span style={{ fontSize: 15 }}>{candidate.runOff ? '*' : null }</span>
            </p>
          </div>
      );
    }

  });

}
export default StateResultView;
