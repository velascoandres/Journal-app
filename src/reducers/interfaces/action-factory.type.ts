import { IBasicAction } from "./basic-action.interface";

export type ActionFactory<T extends IBasicAction<any>> = (...args: any[]) => T; 