import React from 'react';
import ReactDOM from 'react-dom';
import { I18nProvider } from './components/I18n';
import fr from './locales/fr.json';
import en from './locales/en.json';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Catch from './components/Catch';

ReactDOM.render(
  <I18nProvider translations={{ fr, en }} defaultLocale="fr">
    <Catch>
      <App />
    </Catch>
  </I18nProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
