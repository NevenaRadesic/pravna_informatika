import React, { useState, useEffect } from 'react';
import { Document, pdfjs, Page, View } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './Laws.css'

export const PdfLaw  = () => {

  const pdfURL = 'http://localhost:3000/krivicni.pdf';
  const [numPages, setNumPages] = useState(null);


  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  /*return (
    <div className="pdf-container">
      <Document file={pdfURL}
      onLoadSuccess={({ numPages })=>setNumPages(numPages)}
      
      >
        {Array.apply(null, Array(numPages))
        .map((x, i)=>i+1)
        .map(page => <Page width={900} pageNumber={page}/>)}
      </Document>
    </div>
  )
}*/
return (
  <div className="pdf-container">
    <Document file={pdfURL} onLoadSuccess={({ numPages })=>setNumPages(numPages)}>
      {Array.from({ length: numPages }, (_, index) => (
        <Page key={index + 1} width={900} pageNumber={index + 1} />
      ))}
    </Document>
  </div>
);
};
