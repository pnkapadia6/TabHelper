import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import createStore from '../../app/store/configureStore';

import './tabHelper.css';

ReactDOM.render(<Root store={createStore({})} />, document.querySelector('#root'));
