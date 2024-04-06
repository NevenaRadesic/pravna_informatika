import React, { useState, useEffect } from 'react';
import './AddJudgement.css';
import * as IoIcons from "react-icons/io";
import { FormData, exchangeRates } from './FormData';
import ResultComponent from '../components/ResultComponent';
import { getSimilarJudgements, makeDecisionBasedOnLaw } from '../services/judgementService';
import MakeDecision from '../components/MakeDecision';

function AddJudgement() {
  

  const [inputData, setInputData] = useState({
    court: '',
    judgementNumber: '',
    judge: '',
    prosecutor: '',
    crime: '',
    defendant: '',
    extendedCriminalActivity: '',
    financialStatus: '',
  });

  const [banknoteData, setBanknoteData] = useState({
    value: '',
    quantity: '',
    currency: ''
  });

  const [addedBanknotes, setAddedBanknotes] = useState([]);

  const [total, setTotal] = useState(0);

  const [currencyDict, setCurrencyDict] = useState([]);

  const [resultData, setResultData] = useState({law: null, similar: null});



  useEffect(() => {
    const fetchExchangeRates = async () => {
      let apiUrl = "http://api.exchangeratesapi.io/v1/latest?access_key=d61ea9f6633b186949b583457770e326";
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        // console.log(data);
        setCurrencyDict(data);
      } catch (error) {
        console.log('Error fetching exchange rates.');
        setCurrencyDict(exchangeRates);
      }
      // calculateTotal();
    };
  
    fetchExchangeRates();
  }, []);
  


  let calculateTotal = (banknotes) => {
    let sum = 0;
    // console.log('currencyDict', currencyDict);
    for (let i = 0; i < banknotes.length; i++) {
      let currencyMark = banknotes[i]['currency'].toUpperCase();
      console.log(banknotes[i]['value'], banknotes[i]['quantity'], banknotes[i]['currency']);
      let zadodati = banknotes[i]['value'] * banknotes[i]['quantity'] / currencyDict['rates'][currencyMark]; 
      sum += zadodati;
    }
    console.log(sum);
    setTotal(sum);
  }; 


  /*useEffect(() => {
    console.log('total changed:', total);
  }, [total]);*/

  useEffect(() => {
    console.log('result data changed');
  }, [resultData]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleChangeBanknote = (event) => {
    const { name, value } = event.target;
    setBanknoteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // calculateTotal();
  };


  const handleSubmit = async (event) => {
    event.preventDefault();    
    console.log('total je', total);
    setTotal(parseFloat(total).toFixed(2));
    let similarJudgemenets = await getSimilarJudgements(inputData, total);
    let lawJudgement = await makeDecisionBasedOnLaw(inputData, total);
    console.log('Dobro ga je vratio' + lawJudgement);
    setResultData({law: lawJudgement, similar: similarJudgemenets});
    console.log('da vidimo da li se promenilo' + resultData);
  };


  const addBanknote = async () => {
    setAddedBanknotes(prevBanknotes => [...prevBanknotes, banknoteData]);
    calculateTotal([...addedBanknotes, banknoteData]);
  };

  
  return (
    <div className="form-container" style={{ marginTop: '20px', marginLeft: '300px' }}>
      <form>
        <div className='container'>
          <div className='row'>
            
            <div className='col-2'></div>
            <div className='col-10'>

              <div className="container">
                

                <div className='row'>
                  <h3 style={{marginBottom: '30px'}}>Dodaj presudu</h3>

                  <div className='col-5'>
                    <select  defaultValue={'DEFAULT'} className="form-select" id="floatingSelect" aria-label="Sud" 
                    style={{ height: '58px' }} name='court' onChange={handleChange} >
                      <option value="DEFAULT" disabled>Sud</option>
                      {FormData['courts'].map((courtName, index) => (
                        <option key={index} value={courtName}>
                          {courtName}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div className='col-4'>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="floatingInput" placeholder="K1/2023" 
                        name="judgementNumber"value={inputData.judgementNumber} onChange={handleChange}/>
                      <label htmlFor="floatingInput">Broj presude</label>
                    </div>
                  </div>
                </div>

                <div className='row'>

                  <div className='col-3'>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="floatingInput" placeholder="Marko Markovic" 
                      name="judge"value={inputData.judge} onChange={handleChange}/>
                      <label htmlFor="floatingInput">Sudija</label>
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="floatingInput" placeholder="Marko Markovic" 
                      name="prosecutor"value={inputData.prosecutor} onChange={handleChange}
                      />
                      <label htmlFor="floatingInput">Tužilac</label>
                    </div>
                  </div>


                  <div className='col-3'>
                    <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelect" aria-label="produzeno" 
                      style={{ height: '58px' }} name="crime" onChange={handleChange}>
                      <option value="DEFAULT" disabled> Vrsta krivičnog dela </option>
                      <option value="PROIZVODNJA">Proizvodnja lažnog novca</option>
                      <option value="PRIBAVLJANJE_I_KORISTENJE">Pribavljanje i koristenje</option>
                      <option value="NEPRIJAVLJIVANJE">Neprijavljivanje lažnog novca</option>
                    </select>
                    
                  </div>


                </div>

                <div className='row'>

                  <div className='col-3'>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="floatingInput" placeholder="Marko Markovic" 
                      name="defendant"value={inputData.defendant} onChange={handleChange}
                      />
                      <label htmlFor="floatingInput">Optuženi</label>
                    </div>
                  </div>
                  <div className='col-3'>
                    <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelect" aria-label="produzeno" 
                      style={{ height: '58px' }} name='extendedCriminalActivity' onChange={handleChange}>
                      <option value="DEFAULT" disabled> Produženo krivično delo </option>
                      <option value="true">Da</option>
                      <option value="false">Ne</option>
                    </select>

                  </div>
                  <div className='col-3'>
                    <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelect" aria-label="stanje" 
                    style={{ height: '58px' }} name='financialStatus' onChange={handleChange}>
                      <option value="DEFAULT" disabled>Materijalno stanje optuženog</option>
                      <option value="LOSE">Loše</option>
                      <option value="SREDNJE">Srednje</option>
                      <option value="DOBRO">Dobro</option>
                    </select>
                  </div>
                </div>

                <div style={{ 'height': '10px' }} />
                <div className='col-9'>
                <hr />
                </div>
                
                <div style={{ 'height': '17px' }} />
                <div className='row'>

                  <div className='col-3'>
                    <div className="form-floating mb-3">
                      <input type="number" className="form-control" id="floatingInput" placeholder="0"
                      name="value"value={banknoteData.value} onChange={handleChangeBanknote}
                      />
                      <label htmlFor="floatingInput">Vrednost novčanice</label>
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className="form-floating mb-3">
                      <input type="number" className="form-control" id="floatingInput" placeholder="0" 
                      name="quantity" value={banknoteData.quantity} onChange={handleChangeBanknote}
                      />
                      <label htmlFor="floatingInput">Količina</label>
                    </div>
                  </div>
                  <div className='col-3'>
                    <select  defaultValue={'eur'} className="form-select" id="floatingSelect" aria-label="stanje" 
                    style={{ height: '58px' }} name="currency" onChange={handleChangeBanknote} >
                      <option value="eur" disabled>Valuta</option>
                      <option value="eur">EUR</option>
                      {FormData['currencies'].map((currency, index) => (
                        <option key={index} value={currency.replace(/\s+/g, '-')}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='col-2'>
                    <button type="button" className='btn' style={{ 'marginTop': '7px', backgroundColor: '#71a870', color: '#fff' }} onClick={addBanknote}>Dodaj</button>
                  </div>
                </div>

                <table >
                  <tbody>
                    {addedBanknotes.map((banknote, index) => (
                        <tr key={index}>
                          <td style={{ 'width': '25%' }} scope="row">{banknote.value}</td>
                          <td style={{ 'width': '25%' }}>  {banknote.quantity}</td>
                          <td style={{ 'width': '22%' }}>  {banknote.currency}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className='row'>
                  <div className='col-6'>
                  </div>
                  <div className='col-2' style={{ 'marginTop': '2px' }}>
                    Ukupno (EUR):
                  </div>
                  <div className='col-1'>
                    <b style={{ 'fontSize': '2.6vh', }}>{parseFloat(total).toFixed(2)}</b>
                  </div>
                  <div className='col-2'>
                  </div>
                </div>
                <br/>
                <div className='row'>
                  <button className='btn' type="button" onClick={handleSubmit} style={{ width: '23%', marginLeft: '1%', backgroundColor: '#71a870', color: '#fff' }}>
                    Potvrdi
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </form>
      {resultData.law && <ResultComponent resultData={resultData} />}
      {resultData.law && 
        <MakeDecision 
              input={inputData} 
              total={parseFloat(total)} 
              quantity={banknoteData.quantity}
              options={
                  [...new Set(resultData.similar.map(x => x.appliedRules.split(';')).flat())].map((rule, index) => ({ name: rule, id: index }))
              }
          />
      } 
    </div>
  );
}

export default AddJudgement;
