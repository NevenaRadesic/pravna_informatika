import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Judgement() {
  const [judgements, setJudgements] = useState([]);
  const [selectedJudgement, setSelectedJudgement] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/case-records')
      .then(response => response.json())
      .then(data => setJudgements(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleClose = () => setSelectedJudgement(null);

  return (
    <div style={{ marginLeft: '300px'}}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {judgements.map((judgement) => (
          <Card style={{ width: '24rem' }} key={judgement.id}>
            <Card.Body>
              <Card.Title>{judgement.brojPresude}</Card.Title>
              <Card.Text>
                Sud: {judgement.sud}<br />
                Ime optuženog: {judgement.imeOptuzenog}<br />
                Datum: {judgement.datum}
              </Card.Text>
              <Button variant="primary" onClick={() => setSelectedJudgement(judgement)}>
                Prikaži detalje
              </Button>
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
              <p><strong>Primenjeni propisi:</strong> {selectedJudgement.primenjeniPropisi}</p>
              
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
