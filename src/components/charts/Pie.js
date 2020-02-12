import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import analytics from '../../election-data/analytics';

const { cunaSupportSuccessRate } = analytics;


const state = {
  labels: ['CUNA Candidates', 'Rest of Field'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#2FDE00',
        '#00A6B4'
      ],
      hoverBackgroundColor: [
      '#175000',
      '#003350',
      ],
      data: [cunaSupportSuccessRate(), 100-cunaSupportSuccessRate()]
    }
  ]
}


export class CunaCandidateSuccess extends React.Component {
  render() {
    return (
      <div>

        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'CUNA Success Rate (%)',
              fontSize:20
            },
            legend:{
              display:true,
              position:'bottom'
            }
          }}
        />
      </div>
    );
  }
}
