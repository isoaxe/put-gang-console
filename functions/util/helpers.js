/*
 * Various helper functions used throughout the project.
 */


// Add 31 days to the supplied date.
export function addMonth (date) {
 return new Date(date.setMonth(date.getMonth()+1));
}
