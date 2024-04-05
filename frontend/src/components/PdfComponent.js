import React, { useState } from 'react';

export const PdfComponent = ({judgementNumber}) => {
  //const [judgementNumber, setJudgementNumber] = useState(null);

  const openPdf = () => {
    judgementNumber = judgementNumber.replace(/\//g, "_");
    if (judgementNumber[0] === "K") {judgementNumber = judgementNumber.slice(2);}
    
    const pdfURL = `http://localhost:3000/presude/${judgementNumber}.pdf`;
    window.open(pdfURL);
  };

  return (
    <div>
      <a href="#" onClick={() => openPdf(judgementNumber)} > 
        {judgementNumber}
      </a>
    </div>
  );
};
