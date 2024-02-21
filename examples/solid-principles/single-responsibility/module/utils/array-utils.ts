export const getUnique = (array: any[]): any[] => [...new Set(array)];
export const getUnion = (...arrays: any[][]): any[] => [...new Set(arrays.flat())];
export const getIntersection = (...arrays: any[][]): any[] =>
    arrays.reduce((acc, array) => acc.filter((item) => array.includes(item)));
