/**
 * Common methods for static and draggable cars
 * @type {{getCssClassName: (function()), getStyles: (function())}}
 */
const carMixin = {
  getCssClassName(){
    const model = this.props.model,
      x = model.posX,
      styles = this.styles, // provided by the mixin clients 
      {myCar, orientation, size} = model;
    let y = model.posY;

    if(orientation == 'horizontal'){
      y = y - size + 1;
    }

    return `${myCar ? styles.myCar : ''} 
    ${styles[orientation]} 
    ${styles.car} 
    ${styles['x' + x]} 
    ${styles['y' + y]} 
    ${styles['c' + size]}`;
  }
};

export default carMixin;