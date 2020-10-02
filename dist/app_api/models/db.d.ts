/// <reference types="mongoose" />
export var Connection: import("mongoose").Connection & {
    then: <TResult1 = import("mongoose").Connection, TResult2 = never>(onfulfilled?: (value: import("mongoose").Connection) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>) => Promise<TResult1 | TResult2>;
    catch: <TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>) => Promise<import("mongoose").Connection | TResult>;
};
export var Location: import("mongoose").Model<import("mongoose").Document, {}>;
export var ready: Promise<any>;
