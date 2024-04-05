import React, { useState } from 'react';
import { addJudgement } from '../services/judgementService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MyModal from './MyModal';

const MakeDecision = ({ input, total }) => {
  const [decision, setDecision] = useState({
    appliedRules: '',
    judgementType: ''
  });

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [input2, setInput2] = React.useState(input);


  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDecision((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveJudgement = async () => {
    try {
      addJudgement(decision, input, total);
      toast.success('Vaša presuda je uspešno sačuvana u bazi');
    } catch (error) {
      toast.error('Desila se greška.');
    }
    
  };

  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='col-2'></div>
            <div className='col-10'>
                <div className="container">
                    <div className='row'>
                    
                        <div className='col-6'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="cl. 45." 
                                    name="appliedRules"value={decision.appliedRules} onChange={handleChange}/>
                                <label htmlFor="floatingInput">Primenjeni propisi</label>
                            </div>
                        </div>
                        <div className='col-3'>
                            <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelect" 
                            style={{ height: '58px' }} name="judgementType" onChange={handleChange}>
                            <option value="DEFAULT" disabled> Vrsta presude </option>
                            <option value="oslobadjajuca">Oslobađajuća</option>
                            <option value="uslovna">Uslovna</option>
                            <option value="osudjujuca">Osuđujuća</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4'></div>
                        <div className='col-3'>
                          <button className='btn' style={{ backgroundColor: '#71a870', color: '#fff', marginLeft: '70px' }} onClick={saveJudgement}>Sačuvaj parametre</button>
                        </div>
                        <div className='col-3'>
                          <button className='btn' style={{backgroundColor: '#71a870', color: '#fff' }} onClick={openModal}>Kreiraj presudu</button>
                        </div>
                    </div>
                  
                    <MyModal isOpen={modalIsOpen} startData={input2} pairData={decision}></MyModal>

                    <div className='row'>
                        <div style={{height: '100px'}}></div>
                    </div>
                </div>
            </div>
            <ToastContainer 
              position="bottom-right"
              autoClose={3000} 
              hideProgressBar={true} />
        </div>
    </div>

  );
};

export default MakeDecision;
