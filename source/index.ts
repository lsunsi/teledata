export type Teledata<Error, Data> =
    | "unasked"
    | "loading"
    | ["failure", Error]
    | ["success", Data];

export const unasked = <Error, Data>(): Teledata<Error, Data> => "unasked";
export const loading = <Error, Data>(): Teledata<Error, Data> => "loading";
export const success = <Error, Data>(data: Data): Teledata<Error, Data> => [
    "success",
    data
];
export const failure = <Error, Data>(error: Error): Teledata<Error, Data> => [
    "failure",
    error
];
