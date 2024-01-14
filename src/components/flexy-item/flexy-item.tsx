import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'fxy-item',
  styleUrl: 'flexy-item.scss',
  shadow: true,
})
export class FlexyItem {
  /**
   * A shorthand for setting flex-grow, flex-shrink, and flex-basis.
   * Accepts standard CSS flex property values.
   */
  @Prop() fxy: string = '';

  /**
   * Align self. Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
   */
  @Prop() fxyAlign: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | '' = '';

  /**
   * Parses the `fxy` property value to set appropriate flex and sizing styles.
   * When a number is provided, it's treated as a flex basis percentage.
  */
  private parseFxyValue(fxyValue: string): { flex: string, maxWidth?: string, minWidth?: string } {
    // Split the input to check the number of values provided
    const values = fxyValue.split(' ');
    
    // Default values for flex-grow and flex-shrink
    const defaultGrow = '1';
    const defaultShrink = '1';

  
    // Check if only flex-basis is provided
    if (values.length === 1 && (values[0].includes('%') || values[0].includes('px'))) {
      const basis = values[0];
      return {
        flex: `${defaultGrow} ${defaultShrink} ${basis}`,
        maxWidth: basis,
        minWidth: basis
      };
    } 
  
    // For complete shorthand like '2 2 50%', use as is
    if (values.length === 3) {
      return {
        flex: fxyValue,
        maxWidth: values[2],
        minWidth: values[2]
      };
    }

    // if is not using shorthand or has a width with % o px, parse to number and append %'
    if (!isNaN(parseFloat(fxyValue)) && isFinite(parseFloat(fxyValue))) {
      // Append '%' if it's a plain number
      const basis = fxyValue.includes('%') || fxyValue.includes('px') ? fxyValue : `${fxyValue}%`;
      return {
        flex: `1 1 ${basis}`,
        maxWidth: basis,
        minWidth: basis
      };
    }
  
    // Default return for unexpected input
    return {
      flex: '1 1 0%',
      maxWidth: '',
      minWidth: ''
    };
  }

  render() {
    const fxyStyles = this.parseFxyValue(this.fxy);
    const style = {
      ...fxyStyles,
      boxSizing: 'border-box',
      alignSelf: this.fxyAlign
    };

    return (
      <Host style={style} 
      class={{
        'fxy-item': true,
      }}>
        <slot></slot>
      </Host>
    );
  }
}