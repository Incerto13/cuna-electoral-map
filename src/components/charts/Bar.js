import React from 'react';
import {Bar, HorizontalBar} from 'react-chartjs-2';


const primaryCalendar = {
  labels: ['Febuary', 'March',
           'April', 'May', 'June'],
  datasets: [
    {
      label: 'States/Territories',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [4, 29, 10, 7, 6]
    }
  ]
}

export class PrimaryCalendar extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={primaryCalendar}
          height={300}
          options={{
            title:{
              display:true,
              text:'Primary Calendar',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

const competitiveNominations = {
  labels: ['Democratic Senate', 'Republicans Senate', 'Democratic House', 'Democratic Senate'],
  datasets: [
    {
      label: 'Avg # of Candidates per Race',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [2.3, 4.5]
    }
  ]
}

export class CompetitiveNominations extends React.Component {


  render() {
    return (
      <div>
        <HorizontalBar
          data={competitiveNominations}
          height={300}
          options={{
            title:{
              display:true,
              text:'Candidates per Race',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}
