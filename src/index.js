import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { browserHistory } from 'react-router';
import App from './components/App';
import Routes from './routes';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
    <Routes history={browserHistory} />,
    document.getElementById('root')
  );
registerServiceWorker();
