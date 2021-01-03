import 'bootstrap/dist/css/bootstrap.min.css';
import  './assets/css/style.css';
import  './assets/css/reset.css';
import  './assets/css/font-awesome.css';
import  './assets/css/themify-icons.css';
import  './assets/css/niceselect.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import {createStore,applyMiddleware,compose} from 'redux';
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import reportWebVitals from './reportWebVitals';    
const store = createStore(reducers,{},compose(applyMiddleware(reduxThunk)))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
