import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Card, Button, Modal } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import * as CiIcons from "react-icons/ci";
// import 'bootstrap/dist/css/bootstrap.min.css';

import './Judgement.css'

function Judgement({setJudgement}) {
  const [judgements, setJudgements] = useState([]);
  const [selectedJudgement, setSelectedJudgement] = useState(null);
  const [currentJudgement, setCurrentJudgement] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/case-records')
      .then(response => response.json())
      .then(data => {setJudgements(data); setNewJudgement(data[0]); })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);


  const handleClose = () => setSelectedJudgement(null);

  const parsePrimenjeniPropisi = (propisi) => {
    // Splitting the string by semicolon to get individual parts
    const parts = propisi.split(';');
    
    // Transforming each part into a link or text
    const transformedParts = parts.map((part) => {
      const firstNumberMatch = part.match(/\d+/); // Find the first number
      if (firstNumberMatch) {
        const number = firstNumberMatch[0];
        const url = `law#art_${number}`;
        return <span key={part}><a href={url}>{part}</a>; </span>;
      }
      return <span key={part}>{part}; </span>;
    });
  
    return transformedParts;
  };

  function setNewJudgement(judgement) {
    if (!judgement) {
      return;
    }
    console.log(judgement);
    setJudgement(judgement);
    // add class to the selected judgement
    document.getElementById(judgement.id).classList.add('selected-judgement');
    if (currentJudgement !== null) {
      document.getElementById(currentJudgement).classList.remove('selected-judgement');
    }
    setCurrentJudgement(judgement.id);
  }
  

  return (
    <div style={{width: '30%', display: 'flex', justifyContent: 'start', overflow: 'scroll', height: '100vh'}}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {judgements.map((judgement) => (
          <Card style={{ width: '24rem' }} key={judgement.id} id={judgement.id} onClick={() => setNewJudgement(judgement)}>
            <Card.Body>
                
              <div className='card-header-mrnjau'>
                {judgement.brojPresude}
                <CiIcons.CiShare1 className='icon' style={{ color: "#4a5759" }} />
              </div>
              <div className='card-body-mrnjau'>
                
                <div style={{fontFamily: "'Ariel', sans-serif"}}>
                  <CiIcons.CiBank className='icon' style={{ color: "#4a5759" }} /> &nbsp;
                  {judgement.sud}
                </div>

                <div style={{fontFamily: "'Ariel', sans-serif"}}>
                  <CiIcons.CiUser className='icon' style={{ color: "#4a5759" }} /> &nbsp;
                  {judgement.imeOptuzenog}
                </div>

                <div style={{fontFamily: "'Ariel', sans-serif"}}>
                  <CiIcons.CiCalendar className='icon' style={{ color: "#4a5759" }} /> &nbsp;
                  {judgement.datum}
                </div>

              </div>

              

            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={selectedJudgement !== null} onHide={handleClose}   dialogClassName="custom-modal-width">
        <Modal.Header closeButton>
          <Modal.Title>Detalji presude: {selectedJudgement && selectedJudgement.brojPresude}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJudgement && (
            <>
              <p><strong>Broj Presude:</strong> {selectedJudgement.brojPresude}</p>
              <p><strong>Sud:</strong> {selectedJudgement.sud}</p>
              <p><strong>Datum:</strong> {selectedJudgement.datum}</p>
              <p><strong>Ime Sudije:</strong> {selectedJudgement.imeSudije}</p>
              <p><strong>Tužilac:</strong> {selectedJudgement.tuzilac}</p>
              <p><strong>Ime Optuženog:</strong> {selectedJudgement.imeOptuzenog}</p>
              <p><strong>Krivično delo:</strong> {selectedJudgement.krivicnoDelo}</p>
              <p><strong>Produzeno krivično delo:</strong> {selectedJudgement.produzenoKrivicnoDelo}</p>
              <p><strong>Vrsta dela:</strong> {selectedJudgement.vrstaDela}</p>
              <p><strong>Broj falsifikovanih novčanica:</strong> {selectedJudgement.brojFalsifikovanihNovcanica}</p>
              <p><strong>Ukupna vrednost falsifikovanih novčanica:</strong> {selectedJudgement.ukupnaVrednostFalsifikovanihNovcanica}</p>
              <p><strong>Ukupna vrednost falsifikovanih novčanica:</strong> {selectedJudgement.imovnoStanjeOptuzenog}</p>
              <p><strong>Državljanstvo:</strong> {selectedJudgement.drzavljanstvo}</p>
              <p><strong>Broj optuženih:</strong> {selectedJudgement.brojOptuzenih}</p>
              <p><strong>Vrsta presude:</strong> {selectedJudgement.vrstaPresude}</p>
              <p><strong>Primenjeni propisi:</strong> {selectedJudgement.primenjeniPropisi && parsePrimenjeniPropisi(selectedJudgement.primenjeniPropisi)}</p>

              
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Judgement;
