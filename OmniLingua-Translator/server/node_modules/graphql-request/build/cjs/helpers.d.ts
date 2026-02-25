import type * as Dom from './types.dom.js';
export type RemoveIndex<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};
export declare const uppercase: <S extends string>(str: S) => Uppercase<S>;
/**
 * Convert Headers instance into regular object
 */
export declare const HeadersInstanceToPlainObject: (headers: Dom.Response['headers']) => Record<string, string>;
//# sourceMappingURL=helpers.d.ts.map