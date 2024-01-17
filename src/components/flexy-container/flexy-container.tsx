import { Component, Host, Prop, h, Element , State } from '@stencil/core';
import { Breakpoints } from '../../utils/breakpoints';
import { mediaQueryListenerManager } from '../../utils/media-query-listener-manager'
import {  StyleManager } from '../../utils/style-manager';
import { StyleDefinition } from '../../utils/style-util';
// Define a type for responsive props
export type ResponsiveProp<T> = T | { [key in keyof typeof Breakpoints]?: T };

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse' | '';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse' | '';
const RESPONSIVE_PROPS: string[] = ['fxyDirection', 'fxyWrap', 'fxyGap', 'fxyAlign', 'fxyFill'];

@Component({
  tag: 'fxy-container',
  shadow: true,
})
export class FlexyContainer {
  private mediaQueryManager = mediaQueryListenerManager; //new MediaQueryListenerManager(Breakpoints);
  private styleManager = StyleManager;

  @State() isMobile: boolean = false;

  @Element() private el: HTMLElement;

  /**
   * If `true`, the container will fill its parent's height and width.
  */
  @Prop() fxyFill: boolean;

  /**
   * If `true`, the container will fill its parent's height and width on extra small devices.
  */
  @Prop() fxyFillXs: boolean;
  

  /**
   * If `true`, the container will fill its parent's height and width on small devices.
  */
  @Prop() fxyFillSm: boolean;

  /**
   * If `true`, the container will fill its parent's height and width on medium devices.
  */
  @Prop() fxyFillMd: boolean;

  /**
   * If `true`, the container will fill its parent's height and width on large devices.
  */
  @Prop() fxyFillLg: boolean;  

  /**
   * If `true`, the container will fill its parent's height and width on extra large devices.
  */
  @Prop() fxyFillXl: boolean;

  /**
   * Sets the `place-content` value for aligning content within the container.
   * Accepts a combination of `justify-content` and `align-content` values.
   * Example: "center space-around".
  */
  @Prop() fxyAlign: string = "flex-start stretch";

  /**
   * Sets the `place-content` value for aligning content within the containerfor extra-small devices
  */
  @Prop() fxyAlignXs: string = "";

  /**
   * Sets the `place-content` value for aligning content within the containerfor small devices
  */
  @Prop() fxyAlignSm: string = "";

  /**
   * Sets the `place-content` value for aligning content within the containerfor medium devices
  */
  @Prop() fxyAlignMd: string = "";

  /**
   * Sets the `place-content` value for aligning content within the containerfor large devices
  */
  @Prop() fxyAlignLg: string = "";

  /**
   * Sets the `place-content` value for aligning content within the containerfor extra large devices
  */
  @Prop() fxyAlignXl: string = "";

  /**
   * Sets the flex-direction of the container. 
   * Can be "row", "row-reverse", "column", or "column-reverse".
  */
  @Prop() fxyDirection: ResponsiveProp<FlexDirection> = 'row';

  /**
   * Flex direction for extra-small devices.
   * Accepts 'row', 'row-reverse', 'column', 'column-reverse'.
   */
  @Prop() fxyDirectionXs: FlexDirection = '';

  /**
   * Flex direction for small devices.
   * Accepts 'row', 'row-reverse', 'column', 'column-reverse'.
   */
  @Prop() fxyDirectionSm: FlexDirection = '';

  /**
   * Flex direction for medium devices.
   * Accepts 'row', 'row-reverse', 'column', 'column-reverse'.
   */
  @Prop() fxyDirectionMd: FlexDirection = '';

  /**
   * Flex direction for large devices.
   * Accepts 'row', 'row-reverse', 'column', 'column-reverse'.
   */
  @Prop() fxyDirectionLg: FlexDirection = '';

  /**
   * Flex direction for extra-large devices.
   * Accepts 'row', 'row-reverse', 'column', 'column-reverse'.
   */
  @Prop() fxyDirectionXl: FlexDirection = '';

  /**
   * Sets spacing between immediate child elements (`fxy-item`).
   * The value is applied as a right margin to all children except the last one.
  */
  @Prop({mutable: true}) fxyGap: string = '0px';

  /**
   * Sets spacing between immediate child elements (`fxy-item`) for extra small devices..
  */
  @Prop() fxyGapXs: string = '';

  /**
   * Sets spacing between immediate child elements (`fxy-item`) for small devices..

  */
  @Prop() fxyGapSm: string = '';

  /**
   * Sets spacing between immediate child elements (`fxy-item`) for medium devices..
  */
  @Prop() fxyGapMd: string = '';

  /**
   * Sets spacing between immediate child elements (`fxy-item`) for large devices..
  */

  @Prop() fxyGapLg: string = '';
  /**
   * Sets spacing between immediate child elements (`fxy-item`) for extra large devices..
  */
  @Prop() fxyGapXl: string = '';

  /**
   * Sets the flex-wrap property of the container.
  */
  @Prop() fxyWrap: FlexWrap = 'nowrap';

  /**
   * Sets the flex-wrap property of the container for extra small devices..
   * Can be "nowrap", "wrap", or "wrap-reverse".
  */
  @Prop() fxyWrapXs: FlexWrap = '';

  /**
   * Sets the flex-wrap property of the container for small devices..
   * Can be "nowrap", "wrap", or "wrap-reverse".
  */
  @Prop() fxyWrapSm: FlexWrap = '';

  /**
   * Sets the flex-wrap property of the container for medium devices..
   * Can be "nowrap", "wrap", or "wrap-reverse".
  */
  @Prop() fxyWrapMd: FlexWrap = '';

  /**
   * Sets the flex-wrap property of the container for large devices..
   * Can be "nowrap", "wrap", or "wrap-reverse".
  */

  @Prop() fxyWrapLg: FlexWrap = '';
  /**
   * Sets the flex-wrap property of the container for extra large devices..
   * Can be "nowrap", "wrap", or "wrap-reverse".
  */
  @Prop() fxyWrapXl: FlexWrap = '';

  /**
   * Applies the `fxyGap` value as a margin-right to all child `fxy-item` elements except the last one.
  */
  private applyGapToItems() {
    if (this.fxyGap) {
      const items = Array.from(this.el.children).filter(child => child.tagName.toLowerCase() === 'fxy-item');
      
      items.forEach((item: HTMLElement, index) => {
        if (index < items.length - 1) { // Apply to all except the last
          if(this.fxyDirection === 'row') {
            item.style.marginRight = this.fxyGap;
            item.style.marginBottom = '';
          } else {
            item.style.marginRight = '';
            item.style.marginBottom = this.fxyGap ? this.fxyGap : ' ';
          }
        }
      });
    }
  }

  componentWillLoad() {
    let results = this.styleManager.identifyBreakpointValues(RESPONSIVE_PROPS, this.el);

    if(Object.keys(results).length) {
      this.mediaQueryManager.mediaQueryChanges.subscribe((event: MediaQueryListEvent) => {
        this.styleManager.applyStyles(this.el, event);
      });
    }
  }
  /**
   * Parses the `fxyAlign` property value to set the `place-content` CSS property.
   * Replaces "none" with default values for `justify-content` and `align-content`.
  */
  private parseFxyAlign(): StyleDefinition {
    const css = {};
    const [mainAxis, crossAxis] = this.fxyAlign.split(' ');

    // Main axis
    switch (mainAxis) {
      case 'center':
        css['justify-content'] = 'center';
        break;
      case 'space-around':
        css['justify-content'] = 'space-around';
        break;
      case 'space-between':
        css['justify-content'] = 'space-between';
        break;
      case 'space-evenly':
        css['justify-content'] = 'space-evenly';
        break;
      case 'end':
      case 'flex-end':
        css['justify-content'] = 'flex-end';
        break;
      case 'start':
      case 'flex-start':
      default :
        css['justify-content'] = 'flex-start';  // default main axis
        break;
    }

    // Cross-axis
    switch (crossAxis) {
      case 'start':
      case 'flex-start':
        css['align-items'] = css['align-content'] = 'flex-start';
        break;
      case 'center':
        css['align-items'] = css['align-content'] = 'center';
        break;
      case 'end':
      case 'flex-end':
        css['align-items'] = css['align-content'] = 'flex-end';
        break;
      case 'space-between':
        css['align-content'] = 'space-between';
        css['align-items'] = 'stretch';
        break;
      case 'space-around':
        css['align-content'] = 'space-around';
        css['align-items'] = 'stretch';
        break;
      case 'baseline':
        css['align-content'] = 'stretch';
        css['align-items'] = 'baseline';
        break;
      case 'stretch':
      default : // 'stretch'
        css['align-items'] = css['align-content'] = 'stretch';   // default cross axis
        break;
    }
    
    return css;
  }

  buildFxyFillStyles(): StyleDefinition {
    if (this.fxyFill) {
      return {
        height: '100%',
        minHeight: '100%',
        width: '100%',
        minWidth: '100%',
      };
    } 
      
    return {
      height: '',
      minHeight: '',
      width: '',
      minWidth: ''
    };
  }

  buildStyles() {
    const placeContent = this.parseFxyAlign();
    const fillStyles = this.buildFxyFillStyles() as any;

    return {
      'display': 'flex',
      'flex-direction': this.fxyDirection,
      'flex-wrap': this.fxyWrap,
      'box-sizing': 'border-box',
      ...fillStyles,
      ...placeContent,
    };
  }
  
  componentWillRender() {
    this.applyGapToItems();
  }
  
  disconnectedCallback() {
    this.mediaQueryManager.removeListeners();
  }

  render() {
    const style = this.buildStyles()

    return (
      <Host style={style}>
        <slot></slot>
      </Host>
    );
  }
}