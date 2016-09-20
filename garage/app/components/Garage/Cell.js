import React from 'react';

export default class Cell extends React.Component {
  render(){
    const { x, y, exit, showExitLabel, styles} = this.props;

    var className = `${styles.cell} 
    ${styles['x'+x]} 
    ${styles['y'+y]} 
    ${(exit ? styles.exit : '')}`;

    var exitLabel = exit && showExitLabel ? <div className={styles.exitLabel}>Exit</div> : '';
    return (
      <div className={className} >{exitLabel}</div>
    );
  }
}