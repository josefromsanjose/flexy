
import { BehaviorSubject } from 'rxjs';
import { Breakpoints } from'./breakpoints';

class MediaQueryListenerManager {
    private mediaQueryLists: Map<string, MediaQueryList> = new Map();
    private mediaQuerySubject: BehaviorSubject<MediaQueryListEvent | null> = new BehaviorSubject(null);
    private activeBreakpoint: string | null = null;

    constructor(private breakpoints: { [key: string]: string }) {
      Object.keys(breakpoints).forEach(bp => {
        this.addListener(bp)
      });
    }
  
    public mediaQueryChanges = this.mediaQuerySubject.asObservable();
  
    public addListener(breakpoint: string): void {
      const query = this.breakpoints[breakpoint];
      const mediaQueryList = window.matchMedia(query);
      
      const listener = (e: MediaQueryListEvent) => {
        if (e.matches) {
          this.activeBreakpoint = breakpoint;
        }

        this.mediaQuerySubject.next(e);
      };
  
      mediaQueryList.addEventListener('change', listener);
      this.mediaQueryLists.set(breakpoint, mediaQueryList);

      // Check and emit the initial state of the media query
      if (mediaQueryList.matches) {
        this.activeBreakpoint = breakpoint;
        this.mediaQuerySubject.next({ media: mediaQueryList.media, matches: true } as any);
      }
    }
    
    public getActiveBreakpoint(): string | null {
      return this.activeBreakpoint;
    }
  
    public removeListeners(): void {
      this.mediaQueryLists.forEach((mediaQueryList) => {
        const currentListener = (e: MediaQueryListEvent) => {
          this.mediaQuerySubject.next(e);
        };
        mediaQueryList.removeEventListener('change', currentListener);
      });
      this.mediaQueryLists.clear();
    }
  }

  export const mediaQueryListenerManager = new MediaQueryListenerManager(Breakpoints);