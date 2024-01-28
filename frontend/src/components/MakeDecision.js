import React, { useState } from 'react';
import { addJudgement } from '../services/judgementService';

const MakeDecision = ({ input, total }) => {
  const [decision, setDecision] = useState({
    appliedRules: '',
    judgementType: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDecision((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveJudgement = async () => {
    addJudgement(decision, input, total);

    
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
                        <button className='btn btn-primary' style={{ marginLeft: '54%', width: '20%' }} onClick={saveJudgement}>Sačuvaj presudu</button>
                    </div>
                    <div className='row'>
                        <div style={{height: '100px'}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default MakeDecision;
