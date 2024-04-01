import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GoIcons from "react-icons/go";
import * as ImIcons  from "react-icons/im";
import * as HiIcons from "react-icons/hi";


export const SidebarData = [
  {
    title: 'Zakoni',
    path: '/law',
    icon: <FaIcons.FaBook className='icon' style={{ color: "#4a5759" }} />,
    cName: 'nav-text'
  },
  {
    title: 'PDF zakona',
    path: '/pdf-law',
    icon: <HiIcons.HiDocument className='icon' style={{ color: "#4a5759" }} />,
    cName: 'nav-text'
  },
  {
    title: 'Presude',
    path: '/judgement',
    icon: <ImIcons.ImHammer2 className='icon' style={{ color: "#4a5759" }}/>,
    cName: 'nav-text'
  },
  {
    title: 'Nova presuda',
    path: '/add',
    icon: <FaIcons.FaPlus className='icon' style={{ color: "#4a5759" }} />,
    cName: 'nav-text'
  },
  
];