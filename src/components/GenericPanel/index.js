import React, { Component } from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import fontAwesome from 'font-awesome/css/font-awesome.css';
import PropTypes from 'prop-types';
import { changeNetworkProperty } from 'actions';
import { getPanelVisibility } from 'selectors';
import Button from '../Button';
import styles from './styles.css';

class GenericPanel extends Component {
  getArrow = (visible) => {
    const arrowDirection = visible ? fontAwesome.faArrowRight : fontAwesome.faArrowLeft;

    return (
      <i className={`${fontAwesome.fa} ${arrowDirection}`} />
    );
  };

  handleToggleClick = (visible, dispatch) => () => {
    const action = changeNetworkProperty(
      'propertiesPanelVisible',
      !visible,
    );

    dispatch(action);
  };

  render() {
    const { visible, children, dispatch } = this.props;

    return (
      <div
        className={classNames({
          [styles.panel]: true,
          [styles.panelShown]: visible,
        })}
      >
        <Button
          className={styles.toggleButton}
          onClick={this.handleToggleClick(visible, dispatch)}
          title={visible ? 'Recolher' : 'Expandir'}
        >
          {this.getArrow(visible)}
        </Button>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }
}

GenericPanel.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  visible: getPanelVisibility(state),
});

export default connect(mapStateToProps)(GenericPanel);
