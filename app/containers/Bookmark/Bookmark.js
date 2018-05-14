import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _forEach from 'lodash/forEach';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';

import { hideBookmarkSection } from '../../actions/bookmark';

import style from './bookmark.css';

class Bookmark extends Component {
  constructor(props) {
    super();
    this.state = _reduce(props.tabsForBookmark, (tabMap, tab) => {
      tabMap[tab.url] = tab.title;
      return tabMap;
    }, {});
  }

  onClickBack = () => this.props.hideBookmarkSection();

  onClickBookmark = () => {
    chrome && _forEach(this.state, (tabTitle, tabUrl) => {
      chrome.bookmarks.create({
        url: tabUrl,
        title: tabTitle
      }, this.onClickBack);
    });
  }

  onChangeTitle = e => {
    this.setState({ [e.target.dataset.url]: e.target.value });
  }

  renderBookmarkTab = (tabTitle, tabUrl) => {
    return (
      <div className={style.bookmark} key={tabUrl}>
        <div className={style.bkUrl}>{tabUrl}</div>
        <div className={style.bkTitle}>
          <input
            className={style.bkInput}
            type="text"
            value={tabTitle}
            data-url={tabUrl}
            onChange={this.onChangeTitle} />
        </div>
      </div>
    );
  }

  render() {
    //console.log('--- map', this.state);
    return (
      <div className={style.container}>
        <div className={style.header}>Bookmark the tabs!</div>
        <div className={style.back} onClick={this.onClickBack}>Back</div>
        <div className={style.listContainer}>
          {_map(this.state, this.renderBookmarkTab)}
        </div>
        <div className={style.bkButtonContainer}>
          <div className={style.bkButton} onClick={this.onClickBookmark}>Bookmark</div>
        </div>
      </div>
    );
  }
}

Bookmark.propTypes = {
  tabsForBookmark: PropTypes.object,
  hideBookmarkSection: PropTypes.func,
};

export default connect(
  state => ({ tabsForBookmark: state.bookmark.tabsForBookmark }),
  { hideBookmarkSection }
)(Bookmark);
