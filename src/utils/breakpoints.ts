// breakpoints.ts
export const Breakpoints = {
    xs: '(max-width: 599px)',
    sm: '(min-width: 600px) and (max-width: 959px)',
    md: '(min-width: 960px) and (max-width: 1279px)',
    lg: '(min-width: 1280px) and (max-width: 1919px)',
    xl: '(min-width: 1920px)'
} as const;

// Define a type for the keys of Breakpoints
export type Breakpoint = keyof typeof Breakpoints;

export type PropBreakpointModifiers = 'Xs' | 'Sm' | 'Md' | 'Lg' | 'Xl';

export const PROP_RESPONSIVE_MODIFIERS: PropBreakpointModifiers[] = ['Xs', 'Sm', 'Md', 'Lg', 'Xl'];