import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { createJudgement } from '../services/judgementService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyModal = ({ isOpen, startData, pairData}) => {
  
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

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
      const content = divContentRef.current.textContent;
      createJudgement(content);
      toast.success('PDF presude je uspesno napravljen');
    } catch (error) {
      toast.error('Desila se greška.');
    }
    
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <Modal 
        isOpen={modalIsOpen} 
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}

        style={customStyles} 
        contentLabel="Example Modal"
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} ref={divContentRef} >
          <h3>{startData.court}</h3>
          <h3>{startData.judgementNumber}</h3>
          <p>25. April 2019</p>
          <h7>U IME CRNE GORE</h7>
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
              Optuženi: {startData.defendant}, {startData.financialStatus.toLowerCase()}g materijalnog stanja, 
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
