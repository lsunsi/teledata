type Unasked = "unasked";
type Loading = "loading";
type Failure<Error> = ["failure", Error];
type Success<Data> = ["success", Data];

export type Teledata<Error, Data> =
    | Unasked
    | Loading
    | Failure<Error>
    | Success<Data>;

/* Constructors */

export const unasked = (): Unasked => "unasked";
export const loading = (): Loading => "loading";
export const success = <Data>(data: Data): Success<Data> => ["success", data];
export const failure = <Error>(error: Error): Failure<Error> => [
    "failure",
    error
];

/* Predicates */

export const isUnasked = <Error, Data>(
    teledata: Teledata<Error, Data>
): teledata is Unasked => teledata === "unasked";

export const isLoading = <Error, Data>(
    teledata: Teledata<Error, Data>
): teledata is Loading => teledata === "loading";

export const isFailure = <Error, Data>(
    teledata: Teledata<Error, Data>
): teledata is Failure<Error> => teledata[0] === "failure";

export const isSuccess = <Error, Data>(
    teledata: Teledata<Error, Data>
): teledata is Success<Data> => teledata[0] === "success";

/* Mapping */

export const case_ = <Error, Data, Result>(branches: {
    unasked(): Result;
    loading(): Result;
    failure(e: Error): Result;
    success(d: Data): Result;
}) => (teledata: Teledata<Error, Data>): Result => {
    if (isUnasked<Error, Data>(teledata)) {
        return branches.unasked();
    } else if (isLoading<Error, Data>(teledata)) {
        return branches.loading();
    } else if (isFailure<Error, Data>(teledata)) {
        return branches.failure(teledata[1]);
    } else if (isSuccess<Error, Data>(teledata)) {
        return branches.success(teledata[1]);
    } else {
        throw ":(";
    }
};
