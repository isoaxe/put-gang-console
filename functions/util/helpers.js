/*
 * Various helper functions used throughout the project.
 */


// Add 31 days to the supplied date.
export function addMonth (date) {
 return new Date(date.setMonth(date.getMonth()+1));
}


// Returns true if user has not subscribed before and payment is subscription type.
export function newSubscriber (alreadySubbed, paymentType) {
  return !alreadySubbed && (paymentType === "join" || paymentType === "watch");
}


/* Filter a nested object based on an array of authorized values.
 * The values in the object will themselves be objects.
 * The filtered values will be inside the value object, hence nested.
 * const obj = {
 *  "4": { "key1": "value1", "name": "peter" },
 *  "2": { "key2": "value2", "name": "paul" },
 *  "8": { "key3": "value3", "name": "jacob" }
 * }
 *
 * Can filter with an array of name values, e.g. [peter, jacob].
 */

 export function filterObject (obj, allowed, targetKey) {
   const filter = (obj, predicate) =>
     Object.assign(
       ...Object.keys(obj)
       .filter( key => predicate(obj[key]) )
       .map( key => ({ [key]: obj[key] }) )
     );
   return filter(obj, data => allowed.includes(data[targetKey]));
 }
