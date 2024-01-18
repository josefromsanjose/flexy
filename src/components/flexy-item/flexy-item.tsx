import { Component, Host, Prop, h, Element } from '@stencil/core';
import {  StyleManager } from '../../utils/style-manager';
import { mediaQueryListenerManager } from '../../utils/media-query-listener-manager';

export type FlexAlign = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | '';
const RESPONSIVE_PROPS: string[] = ['fxy', 'fxyAlign'];

@Component({
  tag: 'fxy-item',
  shadow: true,
})
export class FlexyItem {
  
  private mediaQueryManager = mediaQueryListenerManager; 
  private styleManager = StyleManager;
  
  @Element() private el: HTMLElement;

  /**
   * A shorthand for setting flex-grow, flex-shrink, and flex-basis.
   * Accepts standard CSS flex property values or a valid unit of measurement applied as a width and flex-basis.
   */
  @Prop() fxy: string = '';

  /**
   * A shorthand modifier of fxy for setting flex-grow, flex-shrink, and flex-basis for extra small devices.
  */
  @Prop() fxyXs: string = '';

  /**
   * A shorthand modifier of fxy for setting flex-grow, flex-shrink, and flex-basis for small devices.
  */
  @Prop() fxySm: string = '';

  /**
   * A shorthand modifier of fxy for setting flex-grow, flex-shrink, and flex-basis for medium devices.
  */
  @Prop() fxyMd: string = '';
  

  /**
   * A shorthand modifier of fxy for setting flex-grow, flex-shrink, and flex-basis for large devices.
  */
  @Prop() fxyLg: string = '';
  

  /**
   * A shorthand modifier of fxy for setting flex-grow, flex-shrink, and flex-basis for extra large devices.
  */
  @Prop() fxyXl: string = '';

  /**
   * Align self. Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
   */
  @Prop() fxyAlign: FlexAlign = '';

  /**
   * A shorthand modifier of for fxyAlign that sets the flex child element alignment on extra small devices.
   */
  @Prop() fxyAlignXs: FlexAlign = '';

  /**
   * A shorthand modifier of for fxyAlign that sets the flex child element alignment on small devices.
   */
  @Prop() fxyAlignSm: FlexAlign = '';

  /**
   * A shorthand modifier of for fxyAlign that sets the flex child element alignment on medium devices.
   */
  @Prop() fxyAlignMd: FlexAlign = '';

  /**
   * A shorthand modifier of for fxyAlign that sets the flex child element alignment on large devices.
   */
  @Prop() fxyAlignLg: FlexAlign = '';

  /**
   * A shorthand modifier of for fxyAlign that sets the flex child element alignment on extra large devices.
   */
  @Prop() fxyAlignXl: FlexAlign = '';

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

  componentWillLoad() {
    let results = this.styleManager.identifyBreakpointValues(RESPONSIVE_PROPS, this.el);

    if(Object.keys(results).length) {
      this.mediaQueryManager.mediaQueryChanges.subscribe((event: MediaQueryListEvent) => {
        this.styleManager.applyStyles(this.el, event);
      });
    }
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