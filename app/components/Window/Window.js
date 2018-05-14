import React, { PureComponent, PropTypes } from 'react';
import Tab from '../Tab';

import style from './Window.css';

class Window extends PureComponent {
  renderTab = tab => <Tab
    key={tab.id}
    tab={tab}
    selectedTabs={this.props.selectedTabs}
    onToggleSelect={this.props.onToggleSelectTab}
  />;

  render() {
    const { window } = this.props;

    //console.log('window--', window.tabs.length, window.tabs.map(t => t.id));
    return (
      <div key={window.id} className={style.window}>
        <span className={style.tabCount}>Tabs count: {window.tabs.length}</span>
        {window.tabs.map(this.renderTab)}
      </div>
    );
  }
}

Window.propTypes = {
  window: PropTypes.object,
  selectedTabs: PropTypes.object,
  onToggleSelectTab: PropTypes.func,
};

export default Window;
