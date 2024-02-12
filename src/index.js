import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SquareHolder from './PageContent/SquareHolder/SquareHolder';
import DashBar from './PageContent/DashBar/DashBar';
import { MyProvider } from './MyContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyProvider >
        <DashBar />
        <SquareHolder />        
    </MyProvider>

  </React.StrictMode>
);


