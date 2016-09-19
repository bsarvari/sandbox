import React from 'react';
import inBoardStyles from './styles/inBoard.css';
import inGridStyles from './styles/inGameSelector.css';

export default class Cell extends React.Component {
  render(){
    let styles = this.props.inGrid ? inGridStyles : inBoardStyles; 
    const { x, y, exit} = this.props;

    var className = `${styles.cell} 
    ${styles['x'+x]} 
    ${styles['y'+y]} 
    ${(exit ? styles.exit : '')}`;

    var exitLabel = exit && this.props.interactive ? <div className={inBoardStyles.exitLabel}>Exit</div> : '';
    return (
      <div className={className} >{exitLabel}</div>
    );
  }
}