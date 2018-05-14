import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import update from 'immutability-helper';
import _castArray from 'lodash/castArray';

import App from './App';

class Root extends Component {
  constructor() {
    super();
    update.extend('$unset', (_keysToRemove, original) => {
      const keysToRemove = _castArray(_keysToRemove);
      const copy = Object.assign({}, original);
      for (const key of keysToRemove) delete copy[key];
      return copy;
    });
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
