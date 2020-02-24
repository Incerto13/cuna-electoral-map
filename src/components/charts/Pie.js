import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import analytics from '../../election-data/analytics';

const { cunaSupportSuccessRate } = analytics;


const state = {
  labels: ['CUNA-League supported victories'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#42c393',
        '#CCCCCC'
      ],
      hoverBackgroundColor: [
      '#175000',
      '#003350',
      ],
      data: [cunaSupportSuccessRate().successRate, 100-cunaSupportSuccessRate().successRate]
    }
  ]
}


export class CunaCandidateSuccess extends React.Component {
  render() {
    return (
      <div style={{ }}>

        <Doughnut
          data={state}
          height={250}

          maintain
          options={{
            maintainAspectRatio: true,
            title:{
              display: false,
              text:'',
              fontSize: 20
            },
            legend:{
              display: true,
              position:'bottom',
              fontSize: 20
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);
                  return precentage + "%";
                }
              }
            }
          }}
        />
      </div>
    );
  }
}
