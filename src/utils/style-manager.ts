import { Breakpoints, PROP_RESPONSIVE_MODIFIERS} from './breakpoints';

class _StyleManager {
    //map of all the elements that require a value udpate for a abreakpoint
    private elementStyleMap = new Map<HTMLElement, object>();

    public identifyBreakpointValues(properties: string[], element: HTMLElement) : any {
        const modifiers = PROP_RESPONSIVE_MODIFIERS;
        const results = {};
        properties.forEach(property => {
          modifiers.forEach(modifier => {
            const breakpointProperty = property + modifier;
            if (element[breakpointProperty] !== '' && typeof element[breakpointProperty] !== 'undefined') {
              if (!results[property]) {
                results[property] = {
                    fallbackValue: element[property]
                };
              }
            results[property][modifier] = element[breakpointProperty]
            }
          });
        });
        this.elementStyleMap.set(element, results);
        return results;
    }

    public applyStyles(element:HTMLElement, breakpoint: MediaQueryListEvent) {
        let el = this.elementStyleMap.get(element);
        let bp = this.findBreakpointKey(breakpoint.media);

        if (!breakpoint.matches) {
            return;
        }

        Object.keys(el).forEach((prop) => {
            //if there is no breakpoint for the media query, and the fallback prop is not set to the fallback value
            //set the prop to the fallback value. 
            if (!el[prop][bp] && element[prop] !== el[prop]['fallbackValue']) {
                element[prop] = el[prop]['fallbackValue'];
            } else if(el[prop][bp] && element[prop] !== el[prop][bp]) {
                element[prop] = el[prop][bp];
            }
        });
    }

    public findBreakpointKey(mediaQuery: string): string | null {
        for (const [key, value] of Object.entries(Breakpoints)) {
            if (mediaQuery === value) {
                return key.charAt(0).toUpperCase() + key.slice(1);;
            }
        }
        return null; // Return null if no match is found
    }
}

export const StyleManager = new _StyleManager();
