import electionData from '../../election-data'


const getAverage = (array) => {
  const sum = array.reduce((sum, elem) => {
    console.log(sum);
    return sum + elem;
  });
  return sum / array.length;
}

const competitiveNominations = () => {
  const demNumSenateCandidates = [];

 for (let [state, value] of Object.entries(electionData.preElection)) {
   if(value['senate']
    && value['senate']['dem']
    && value['senate']['dem'].length > 0
    && value['senate']['dem'][0] !== 'none'
    ){
      demNumSenateCandidates.push(value['senate']['dem'].length );
   }
 }
 let demSenateAverage = getAverage(demNumSenateCandidates);
 console.log(demSenateAverage);
 return demNumSenateCandidates;
};

export default competitiveNominations;
