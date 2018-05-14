import React, { PureComponent, PropTypes } from 'react';
import style from './Tab.css';

const convertImgToBase64URL = (url, callback, outputFormat) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    let canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');

    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
};

const getFaviconFromURL = (url, callback) => convertImgToBase64URL(`chrome://favicon/${url}`, callback);

class Tab extends PureComponent {
  state = {};

  componentWillMount() {
    getFaviconFromURL(this.props.tab.url, (dataURL) => {
      this.setState({ imageUrl: dataURL });
    });
  }

  onToggleSelect = () => this.props.onToggleSelect(this.props.tab);

  render() {
    const { tab, selectedTabs } = this.props;
    const checkboxId = `tabChecked-${tab.id}`;
    const isChecked = !!selectedTabs[tab.id];

    return (
      <div key={tab.id} className={style.tab}>
        <input
          className={style.tabChecker}
          type="checkbox"
          id={checkboxId}
          checked={isChecked}
          onClick={this.onToggleSelect}
        />
        <div className={style.tabIcon} style={{ backgroundImage: `url('${this.state.imageUrl}')` }} />
        <div className={style.tabTitle}>
          <label htmlFor={checkboxId}>{tab.title}</label>
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  tab: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
  selectedTabs: PropTypes.object,
  onToggleSelect: PropTypes.func,
};

export default Tab;
