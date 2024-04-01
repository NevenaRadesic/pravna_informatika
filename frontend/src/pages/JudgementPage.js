import React, { useState } from "react";
import Judgement from "./Judgement";

import './JudgementPage.css';


const JudgementView = ({judgement}) => {

    const parsePrimenjeniPropisi = (propisi) => {
        if (!propisi) return;
        console.log(propisi);
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
      

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '70%'}}>
            <div>
                <h3 style={{marginBottom: '40px'}}>Pregled presude</h3>
                <table className="judgment-table" style={{minWidth: '40vw'}}>
                    <tr><th>Broj Presude</th><td>{judgement.brojPresude}</td></tr>
                    <tr><th>Sud</th><td>{judgement.sud}</td></tr>
                    <tr><th>Datum</th><td>{judgement.datum}</td></tr>
                    <tr><th>Ime Sudije</th><td>{judgement.imeSudije}</td></tr>
                    <tr><th>Tužilac</th><td>{judgement.tuzilac}</td></tr>
                    <tr><th>Ime Optuženog</th><td>{judgement.imeOptuzenog}</td></tr>
                    <tr><th>Krivično delo</th><td>{judgement.krivicnoDelo}</td></tr>
                    <tr><th>Produzeno krivično delo</th><td>{judgement.produzenoKrivicnoDelo}</td></tr>
                    <tr><th>Vrsta dela</th><td>{judgement.vrstaDela}</td></tr>
                    <tr><th>Broj falsifikovanih novčanica</th><td>{judgement.brojFalsifikovanihNovcanica}</td></tr>
                    <tr><th>Ukupna vrednost falsifikovanih novčanica</th><td>{judgement.ukupnaVrednostFalsifikovanihNovcanica}</td></tr>
                    <tr><th>Ukupna vrednost falsifikovanih novčanica</th><td>{judgement.imovnoStanjeOptuzenog}</td></tr>
                    <tr><th>Državljanstvo</th><td>{judgement.drzavljanstvo}</td></tr>
                    <tr><th>Broj optuženih</th><td>{judgement.brojOptuzenih}</td></tr>
                    <tr><th>Vrsta presude</th><td>{judgement.vrstaPresude}</td></tr>
                    <tr><th>Primenjeni propisi</th><td>{parsePrimenjeniPropisi(judgement.primenjeniPropisi)}</td></tr>
                </table>
            </div>
        </div>
    );
}

export const JudgementPage = () => {
    const [judgement, setjudgement] = useState({});

    return (
        <div className="flex" style={{marginLeft: '300px', display: 'flex', height: '100vh'}}>
            <Judgement setJudgement={setjudgement} />
            <JudgementView judgement={judgement} />
        </div>
    );
}
