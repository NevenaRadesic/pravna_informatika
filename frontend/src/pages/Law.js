
import React, { useState, useEffect} from 'react';
import { Document, pdfjs, Page, View } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useLocation } from 'react-router-dom';



import './Laws.css'
import { Router } from 'react-router-dom';

var XMLParser = require('react-xml-parser');

const convertXmlToJson = (xmlText) => {
  var xml = new XMLParser().parseFromString(xmlText);
  return xml;
};

const specialElements = {
  'heading': 'h3',
  'subheading': 'h4',
  'paragraph': 'div',
  'article': 'div',
  'list': 'ul',
  'item': 'li',
  'table': 'table',
  'row': 'tr',
  'cell': 'td',
  'point': 'span',
  'num': 'h3',
  'ref': 'div'
};

const GenericRenderer = ({ nodeData }) => {

  let { name, attributes, children, value } = nodeData;

  let originalName = name;
  
  if (specialElements[name]) {
    name = specialElements[name];
  } else {
    name = 'div';
  }

  if (attributes && attributes.eId) {
    value = <div id={`${attributes.eId}`} href={`#${attributes.eId}`}>{value}</div>;
  }

  if (attributes && attributes.href) {
    value = <a href={attributes.href}>{value}</a>;
  }


  const currentElement = React.createElement(name, {className: originalName},
    value, 
    children.map((child, index) => (
      <GenericRenderer key={index} nodeData={child} />
    ))
  );
    
  return currentElement;
};

function transformData(data, index, parent=null) {
  if (!data) return null;

  if (data.name === 'num') {
    let sibling = parent.children[index + 1];
    if (data.value.indexOf('.') !== -1 || data.value.indexOf(')') !== -1) {
      sibling.value = `${data.value}  ${sibling.value}`;
    } else {
      sibling.value = `${data.value} - ${sibling.value}`;
    }
    return {children: [], name: '', value: ''};
  }

  if(data.children) {
    data.children = data.children.map((child, index) => transformData(child, index, data));
  }
  
  return data;
}



function Laws() {
  const [akomaNtosoData, setAkomaNtosoData] = useState(null);
  const location = useLocation();


  function locateToElement() {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');
    const targetElement = document.getElementById(targetId);
    const contentRootEl = document.getElementById('law-root');
    // if targetElement does not exist, send to home page
    if (!targetElement && contentRootEl) {
      window.location.href = '/pdf-law';
    }
  
    if (targetId) {
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }


  useEffect(() => {
    fetch('http://localhost:8080/law-akoma-ntoso')
      .then((response) => response.text())
      .then((xml) => {

        
        let jsonData = convertXmlToJson(xml);
        jsonData = jsonData.children[0].children[1];
        console.log(jsonData);
        jsonData = transformData(jsonData, 0);
        setAkomaNtosoData(jsonData);
        locateToElement();

      })
      .catch((error) => {
        console.error('Error fetching or converting the XML:', error);
      });

  }, []);


  if (!akomaNtosoData) {
    return <div>Loading...</div>;
  }

  let genComp = <GenericRenderer nodeData={akomaNtosoData} />;

  return (
    <div style={{ marginLeft: '300px'}} className='law-text' id="law-root">
      {genComp}
    </div>
  );
  
}

export default Laws