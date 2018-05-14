import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MainSection from '../components/MainSection';
import Bookmark from '../containers/Bookmark';
import style from './App.css';

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        {this.props.showBookmarks ? <Bookmark /> : <MainSection />}
      </div>
    );
  }
}

App.propTypes = {
  showBookmarks: PropTypes.bool
};

export default connect(
  state => ({ showBookmarks: state.bookmark.show })
)(App);
