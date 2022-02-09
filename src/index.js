import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './errorBoundary';
import ToastContextProvider from './context/toast/toast-context-provider';
import LoginContextProvider from './context/login/login-context-provider';
import GeneralContextProvider from './context/general/general-context-provider';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ToastContextProvider>
        <LoginContextProvider>
          <GeneralContextProvider>
            <App />
          </GeneralContextProvider>
        </LoginContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  </ErrorBoundary>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
