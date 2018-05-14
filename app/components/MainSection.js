import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import _forEach from 'lodash/forEach';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';

import { showBookmarkSection } from '../actions/bookmark';
import Header from './Header';
import Window from './Window';
import style from './MainSection.css';

class MainSection extends PureComponent {
  state = {
    windows: [],
    selectedTabs: {}
  };

  componentDidMount() {
    this.setWindows();
  }

  onClickClose = () => {
    const { selectedTabs } = this.state;
    if (!_isEmpty(selectedTabs) && chrome) {
      const removePromises = [];
      _forEach(selectedTabs, tab => {
        const tabPromise = new Promise(resolve => {
          chrome.tabs.remove(tab.id, () => {
            resolve();
          });
        });
        removePromises.push(tabPromise);
      });

      Promise.all(removePromises)
        .then(() => this.setWindows({ selectedTabs: {} }));
    }
  }

  onClickBookmark = () => {
    if (!_isEmpty(this.state.selectedTabs)) {
      this.props.showBookmarkSection(this.state.selectedTabs);
    }
  }

  onToggleSelectTab = tab => {
    const { selectedTabs: oldSelectedTabs } = this.state;

    const selectedTabs = update(oldSelectedTabs, oldSelectedTabs[tab.id] ? {
      $unset: tab.id
    } : {
      $merge: {
        [tab.id]: tab
      }
    });

    this.setState({ selectedTabs });
  }

  setWindows = (newState = {}) => {
    if (chrome) {
      chrome.windows.getAll({ populate: true }, allWindows => {
        const windows = _sortBy(allWindows, window => _map(window.tabs, 'active'));
        this.setState({
          ...newState,
          windows
        });
      });
    }
  }

  render() {
    return (
      <section className={style.main}>
        <Header />
        <div className={style.windowContainer}>
          {this.state.windows.map(this.renderWindow)}
        </div>
        <div className={style.footer}>
          <button className={style.button} onClick={this.onClickClose}>Close tabs</button>
          <span className={style.divider} />
          <button className={style.button} onClick={this.onClickBookmark}>Bookmark</button>
        </div>
      </section>
    );
  }

  renderWindow = window => <Window
    key={window.id}
    window={window}
    selectedTabs={this.state.selectedTabs}
    onToggleSelectTab={this.onToggleSelectTab}
  />;
}

MainSection.propTypes = {
  showBookmarkSection: PropTypes.func,
};

export default connect(
  null,
  { showBookmarkSection }
)(MainSection);
