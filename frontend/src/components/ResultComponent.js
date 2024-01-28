import React from 'react';

const ResultComponent = ({ resultData }) => {
  console.log('Result data received:', resultData);
  // Use resultData to render the results
  return (
    
    <div className='container'>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='col-2'>

        </div>
        <div className='col-5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'justify', marginRight: '20px'}}>
          <h5>Slične presude:</h5>
          <table className="table ">
            <thead className="thead-dark">
              <tr>
                <th>Sličnost</th>
                <th>Broj presude</th>
                <th>Vrednost novca</th>
                <th>Finansijski status</th>
              </tr>
            </thead>
            <tbody>
              {resultData.similar.map(judgement => (
                <tr key={judgement.judgementNumber}>
                  <td>{Math.round(judgement.similarity * 100)}%</td>
                  <td> <a href=''>{judgement.judgementNumber}</a></td>
                  <td>{judgement.totalAmount}</td>
                  <td>{judgement.financialStatus.toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-4' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'justify', padding: '10px' }}>
          <h5>Preporuka na osnovu zakona:</h5>
          <p>{resultData.law}</p>
        </div>  
      </div>
    </div>
  );
};

export default ResultComponent;
