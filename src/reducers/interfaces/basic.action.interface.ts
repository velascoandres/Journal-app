export interface IBasicAction<T>{
    type: T;
    payload?: any;
}