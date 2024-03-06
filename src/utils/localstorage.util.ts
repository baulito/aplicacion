/**
 * Local storage save value identifiable with the given key
 * @param key a unique string identifiying the element to save
 * @param value any value to save.
 */
export const saveLocal = (key: string, value: any):void => {
    localStorage.setItem(key, JSON.stringify({value}));
}
/**
 * Obtains the saved value 
 * @param key the given key
 * @returns the value stored
 */
export const retriveLocal = (key: string) : any => {
    return localStorage.getItem(key);
}