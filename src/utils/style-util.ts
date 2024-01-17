/**
 * Definition of a css style. Either a property name (e.g. "flex-basis") or an object
 * map of property name and value (e.g. {display: 'none', flex-order: 5})
 */
export type StyleDefinition = { [property: string]: string | number | null };