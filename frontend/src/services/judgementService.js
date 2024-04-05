
const getSimilarJudgements = async (inputData, total) => {
  let result;
  try {
    inputData.totalAmount = total;
    const response = await fetch('http://localhost:8080/similar', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
      cache: 'default',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    result = await response.json();
    return result;
  } catch (error) {
    console.log(result);
    console.error('Error fetching data from the backend:', error);
    throw error;
  }
};



const makeDecisionBasedOnLaw= async (inputData, total) => {
  try {
    inputData.totalAmount = total;
    const response = await fetch('http://localhost:8080/law', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
      cache: 'default',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log(result + " je rezultat");
    return result.content;
  } catch (error) {
    console.error('Error fetching data from the backend:', error);
    throw error;
  }  
}

const addJudgement = async (decision, input, total) => {
  try {
    input.totalAmount = total;
    input.appliedRules = decision.appliedRules;
    input.judgementType = decision.judgementType;

    const response = await fetch('http://localhost:8080/addJudgement', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
      cache: 'default',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

  } catch (error) {
    console.error('Error fetching data from the backend:', error);
    throw error; 
  }  
}

const createJudgement = async (content) => {
  try {
    const response = await fetch('http://localhost:8080/createJudgement', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
      cache: 'default',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

  } catch (error) {
    console.error('Greska u cuvanju podataka:', error);
    throw error; 
  }  
}




  export {getSimilarJudgements, makeDecisionBasedOnLaw, addJudgement, createJudgement};