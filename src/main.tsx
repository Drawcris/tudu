import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import App from './App.tsx'
import store from './components/store.tsx'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);