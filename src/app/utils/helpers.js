/*
 * Various helper functions used throughout the project.
 */


// Turns a compound object into an array of objects.
// Each object in the array is the value from original with key inserted.
export function objectToArray (compoundObj) {
  const result = [];
  const keys = Object.keys(compoundObj);
  console.log(compoundObj);
  keys.forEach(key => {
    const obj = compoundObj[key]; // Nested object is value.
    obj["id"] = key; // Add key to object.
    result.push(obj);
  })
  return result;
}
