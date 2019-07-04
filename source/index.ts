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

export const isUnasked = <Error, Data>(
    teledata: Teledata<Error, Data>
): boolean => teledata === "unasked";

export const isLoading = <Error, Data>(
    teledata: Teledata<Error, Data>
): boolean => teledata === "loading";

export const isFailure = <Error, Data>(
    teledata: Teledata<Error, Data>
): boolean => teledata[0] === "failure";

export const isSuccess = <Error, Data>(
    teledata: Teledata<Error, Data>
): boolean => teledata[0] === "success";
