export class MediaQueryListenerManager {
    private mediaQueryLists: Map<string, MediaQueryList> = new Map();
    private listeners: Map<string, Set<(e: MediaQueryListEvent) => void>> = new Map();
    
    constructor(private breakpoints: { [key: string]: string }) {}

    public addListener(breakpoint: string, callback: (e: MediaQueryListEvent) => void): void {
      const query = this.breakpoints[breakpoint];
      const mediaQueryList = window.matchMedia(query);
  
      mediaQueryList.addListener(callback);
  
      if (!this.listeners.has(breakpoint)) {
        this.listeners.set(breakpoint, new Set());
      }
      this.listeners.get(breakpoint)?.add(callback);
  
      this.mediaQueryLists.set(breakpoint, mediaQueryList);
    }
  
    public removeListeners(): void {
      this.mediaQueryLists.forEach((mediaQueryList, breakpoint) => {
        const callbacks = this.listeners.get(breakpoint);
        if (callbacks) {
          callbacks.forEach(callback => mediaQueryList.removeListener(callback));
          callbacks.clear();
        }
      });
      this.mediaQueryLists.clear();
    }
  }
  