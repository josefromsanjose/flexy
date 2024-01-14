import { Component, Host, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'fxy-container',
  shadow: true,
})
export class FlexyContainer {
  @Element() private el: HTMLElement;

  /**
   * If `true`, the container will fill its parent's height and width.
  */
  @Prop() fxyFill: boolean = false;

  /**
   * Sets the `place-content` value for aligning content within the container.
   * Accepts a combination of `justify-content` and `align-content` values.
   * Example: "center space-around".
  */
  @Prop() fxyAlign: string = "stretch flex-start";

  /**
   * Sets the flex-direction of the container. 
   * Can be "row", "row-reverse", "column", or "column-reverse".
  */
  @Prop() fxyDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';

  /**
   * Sets spacing between immediate child elements (`fxy-item`).
   * The value is applied as a right margin to all children except the last one.
  */
  @Prop() fxyGap: string;

  /**
   * Sets the flex-wrap property of the container.
   * Can be "nowrap", "wrap", or "wrap-reverse".
  */
  @Prop() fxyWrap: 'nowrap' | 'wrap' | 'wrap-reverse' | '' = '';

  /**
   * Sets the align-items property of the container.
   * Aligns items along the cross axis.
  */
  @Prop() fxyAlignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' = 'stretch';

  /**
   * Parses the `fxyAlign` property value to set the `place-content` CSS property.
   * Replaces "none" with default values for `justify-content` and `align-content`.
  */
  private parseFxyAlign(fxyAlignValue: string): string {
    const defaultJustifyContent = 'flex-start';
    const defaultAlignContent = 'stretch';
    const [justify, align] = fxyAlignValue.split(' ');

    const parsedJustifyContent = justify === 'none' ? defaultJustifyContent : justify;
    const parsedAlignContent = align === 'none' ? defaultAlignContent : align;

    return `${parsedJustifyContent} ${parsedAlignContent}`;
  }

  /**
   * Applies the `fxyGap` value as a margin-right to all child `fxy-item` elements except the last one.
  */
  private applyGapToItems() {
    if (this.fxyGap) {
      const items = Array.from(this.el.children).filter(child => child.tagName.toLowerCase() === 'fxy-item');
      items.forEach((item: HTMLElement, index) => {
        if (index < items.length - 1) { // Apply to all except the last
          item.style.marginRight = this.fxyGap;
        }
      });
    }
  }
  
  componentDidLoad() {
    this.applyGapToItems();
  }

  render() {
    const placeContent = this.parseFxyAlign(this.fxyAlign);
    let fillStyles = {};

    if (this.fxyFill) {
      fillStyles = {
        height: '100%',
        minHeight: '100%',
        width: '100%',
        minWidth: '100%',

      }
    }
    const style = {
      'display': 'flex',
      'flex-direction': this.fxyDirection,
      'flex-wrap': this.fxyWrap,
      'align-items': this.fxyAlignItems,
      'place-content': placeContent,
      'box-sizing': 'border-box',
      ...fillStyles
    };

    return (
      <Host style={style}>
        <slot></slot>
      </Host>
    );
  }
}