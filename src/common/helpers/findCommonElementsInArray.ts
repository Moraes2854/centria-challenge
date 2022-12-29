export const findCommonElementInArrays = (arr1:any[], arr2:any[]): boolean =>{
    return arr1.some(item => arr2.includes(item))
}