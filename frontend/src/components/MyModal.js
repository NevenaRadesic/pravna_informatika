import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { createJudgement } from '../services/judgementService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyModal = ({ isOpen, startData, pairData, setIsOpen}) => {
  

  // useEffect(() => {
  //   setModalIsOpen(isOpen);
  // }, [isOpen]);

  const [formData, setFormData] = useState({
    jmbg: '',
    datumRodjenja: '',
    mestoRodjenja: '',
    prebivaliste: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const divContentRef = useRef(null);

  if (!isOpen) return null;
 
  const customStyles = {
    content: {
      width: '50%',
      height: '70%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const saveJudgement = async () => {
    try {

      const content = { text: divContentRef.current.textContent, id: startData.judgementNumber, html: divContentRef.current.innerHTML };
      createJudgement(content);
      console.log(formData);
      toast.success('PDF presude je uspesno napravljen');
    } catch (error) {
      toast.error('Desila se greška.');
    }
    
  };


  function closeModal() {
    // setModalIsOpen(false);
    setIsOpen(false);
  }


  return (
    <div style={{zIndex: '9999'}} >
      <Modal 
        isOpen={isOpen} 
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}

        style={customStyles} 
        contentLabel="Example Modal"
        
      >
        <div className="container mt-12">
          <div className="row">
            <div className="col-md-6 offset-md-4" style={{ justifyContent: "center" }}>
              <div>
                <h4>Unesite podatke o optuženom</h4>
              </div>
            </div>
          </div>
        </div>
        <br/>

        <div className="container mt-12" style={{zIndex: '100'}}>
          <div className="row">
              <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="jmbg">JMBG:</label>
                  <input type="text" className="form-control" id="jmbg" name="jmbg" value={formData.jmbg} onChange={handleInputChange} placeholder="Unesite JMBG" />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="datumRodjenja">Datum rođenja:</label>
                  <input type="date" className="form-control" id="datumRodjenja" name="datumRodjenja" value={formData.datumRodjenja} onChange={handleInputChange} />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="mestoRodjenja">Mesto rođenja:</label>
                  <input type="text" className="form-control" id="mestoRodjenja" name="mestoRodjenja" value={formData.mestoRodjenja} onChange={handleInputChange} placeholder="Unesite mesto rođenja" />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="prebivaliste">Prebivalište:</label>
                  <input type="text" className="form-control" id="prebivaliste" name="prebivaliste" value={formData.prebivaliste} onChange={handleInputChange} placeholder="Unesite prebivalište" />
                </div>
              </div>
              
          </div>
        </div>

        <br/>
        <br/>
          


        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} ref={divContentRef} >
          <h3>{startData.court}</h3>
          <h3>{startData.judgementNumber}</h3>
          <p>25. April 2019</p>
          <h6>U IME CRNE GORE</h6>
          <div contenteditable="true" style={{ width: '90%' }}>
            <p>
            {startData.court}, po sudiji {startData.judge}, 
              u krivičnom predmetu protiv optuženog {startData.defendant}, zbog krivičnog djela falsifikovanje novca - {startData.crime.toLowerCase().replace(/_/g, ' ')},
              u ukupnom iznosu od {startData.totalAmount.toFixed(2)} evra,
              u prisustvu zastupnika Optužnice {startData.prosecutor}, donio je i javno objavio
              </p>
              <p>
              P R E S U D U
              </p>
              <p>
              Optuženi: {startData.defendant}, JMBG: {formData.jmbg}, rodjen {formData.datumRodjenja} u {formData.mestoRodjenja} sa 
              prebivalistem u {formData.prebivaliste}, {startData.financialStatus.toLowerCase()}g materijalnog stanja, 
              dosad {startData.extendedCriminalActivity ? 'ne' : ''}osuđivan,</p> <p>{startData.extendedCriminalActivity ? 'NI' : ''}JE KRIV
              za djelo za koje se tereti, pa mu sud primjenom {pairData.appliedRules} izriče {pairData.judgementType.toUpperCase()} presudu.  
              </p>
          </div>
          
          
        </div>
        <div style={{ flexDirection: 'column', alignItems: 'right' }}>
        <button style={{marginLeft:'75%', marginTop: '5px'}} className='btn btn-primary' onClick={saveJudgement}>Sacuvaj presudu</button>
        </div>
      </Modal>

    </div>
  );
};

export default MyModal;
