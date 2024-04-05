import React from 'react';
import {PdfComponent} from './PdfComponent';


const ResultComponent = ({ resultData }) => {
  console.log('Result data received:', resultData);

  return (
    
    <div className='container'>
      <br></br>
      <br></br>
      <div>
        
        <div style={{width: '100%'}}>
          <h5>Slične presude:</h5>
          <table className='table' style={{width: '100%'}}>
            <thead className="thead-dark">
              <tr>
                <th style={{width: '20px'}}>Sličnost</th>
                <th style={{width: '20px'}}>Broj presude</th>
                <th style={{width: '20px'}}>Vrednost novca (EUR)</th>
                <th style={{width: '20px'}}>Finansijski status</th>
              </tr>
            </thead>
            <tbody>
              {resultData.similar.map(judgement => (
                <tr key={judgement.judgementNumber}>
                  <td style={{width: '20px'}}>{Math.round(judgement.similarity * 100)}%</td>
                  <td style={{width: '20px'}}><PdfComponent judgementNumber={judgement.judgementNumber} key={judgement.judgementNumber}></PdfComponent> </td>
                  <td style={{width: '20px'}}>{judgement.totalAmount} </td>
                  <td style={{width: '20px'}}>{judgement.financialStatus.toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <PdfComponent></PdfComponent>
         
        </div>
        <div style={{}}>
          <h5>Preporuka na osnovu zakona:</h5>
          <p>{resultData.law}</p>
        </div>  
      </div>
    </div>
  );
};

export default ResultComponent;
