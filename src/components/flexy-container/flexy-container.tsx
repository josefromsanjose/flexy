import { Component, Host, Prop, h, Element , State} from '@stencil/core';
import { Breakpoint, Breakpoints  } from '../../utils/breakpoints';
import { MediaQueryListenerManager } from '../../utils/media-query-listener-manager'

// Define a type for responsive props
export type ResponsiveProp<T> = T | { [key in keyof typeof Breakpoints]?: T };

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse' | '';


@Component({
  tag: 'fxy-container',
  styleUrl: 'flexy-container.scss',
  shadow: true,
})
export class FlexyContainer {
  private mediaQueryManager= new MediaQueryListenerManager(Breakpoints);

  @State() isMobile: boolean = false;

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
  @Prop() fxyDirection: FlexDirection = 'row';

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

  private handleBreakpointChange = (breakpoint: Breakpoint, e: MediaQueryListEvent) => {
    this.isMobile = e.matches;
    console.log(breakpoint)
  }

  private setupBreakpointListeners() {
    if (this.fxyDirectionXs) {
      this.mediaQueryManager.addListener('xs', (e: MediaQueryListEvent) => this.handleBreakpointChange('xs', e));
    }

    if (this.fxyDirectionSm) {
      this.mediaQueryManager.addListener('sm', (e: MediaQueryListEvent) => this.handleBreakpointChange('sm', e));
    }

    if (this.fxyDirectionMd) {
      this.mediaQueryManager.addListener('md', (e: MediaQueryListEvent) => this.handleBreakpointChange('md', e));
    }
    
    if (this.fxyDirectionLg) {
      this.mediaQueryManager.addListener('lg', (e: MediaQueryListEvent) => this.handleBreakpointChange('lg', e));
    }
    
    if (this.fxyDirectionXl) {
      this.mediaQueryManager.addListener('xl', (e: MediaQueryListEvent) => this.handleBreakpointChange('xl', e));
    }
    // ... similarly for md, lg, xl
  }
  
  componentDidLoad() {
    this.applyGapToItems();
    // Register listeners only for set breakpoints
    this.setupBreakpointListeners()
  }

  disconnectedCallback() {
    this.mediaQueryManager.removeListeners();
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