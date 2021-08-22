import React from 'react';
import ReactDOM from 'react-dom';
import LoftTaxi from './LoftTaxi';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./Components/AuthContext";

ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
          <LoftTaxi />
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

/*

Commitizen:
1) для описания коммита вместо -m интерактивное оформление коммита

*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eject script in package.json transform to usuall project using webpack
reportWebVitals(); // для тестирования на утечку памяти (devtools)


