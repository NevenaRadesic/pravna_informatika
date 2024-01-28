
const getSimilarJudgements = async (inputData, total) => {
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

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
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
    return result.content;
  } catch (error) {
    console.error('Error fetching data from the backend:', error);
    throw error; // Re-throw the error to be caught by the calling code
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

    //const result = await response.json();
    //return result.content;
  } catch (error) {
    console.error('Error fetching data from the backend:', error);
    throw error; // Re-throw the error to be caught by the calling code
  }  
}




  export {getSimilarJudgements, makeDecisionBasedOnLaw, addJudgement};