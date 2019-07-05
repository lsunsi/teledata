import test from "ava";
import * as td from "./";

test(".unasked", t => {
    t.is(td.unasked(), "unasked");
});

test(".loading", t => {
    t.is(td.loading(), "loading");
});

test(".success", t => {
    t.deepEqual(td.success<number>(123), ["success", 123]);
});

test(".failure", t => {
    t.deepEqual(td.failure(":("), ["failure", ":("]);
});

test(".isUnasked", t => {
    t.is(td.isUnasked(td.unasked()), true);
    t.is(td.isUnasked(td.loading()), false);
    t.is(td.isUnasked(td.failure(":(")), false);
    t.is(td.isUnasked(td.success(41)), false);
});

test(".isLoading", t => {
    t.is(td.isLoading(td.unasked()), false);
    t.is(td.isLoading(td.loading()), true);
    t.is(td.isLoading(td.failure(":(")), false);
    t.is(td.isLoading(td.success(41)), false);
});

test(".isFailure", t => {
    t.is(td.isFailure(td.unasked()), false);
    t.is(td.isFailure(td.loading()), false);
    t.is(td.isFailure(td.failure(":(")), true);
    t.is(td.isFailure(td.success(41)), false);
});

test(".isSuccess", t => {
    t.is(td.isSuccess(td.unasked()), false);
    t.is(td.isSuccess(td.loading()), false);
    t.is(td.isSuccess(td.failure(":(")), false);
    t.is(td.isSuccess(td.success(41)), true);
});

test(".case_", t => {
    const c = td.case_<number, number, number>({
        unasked: (): number => 12,
        loading: (): number => 34,
        failure: (e: number): number => 56 + e,
        success: (d: number): number => 78 + d
    });
    t.is(c(td.unasked()), 12);
    t.is(c(td.loading()), 34);
    t.is(c(td.failure(1)), 57);
    t.is(c(td.success(1)), 79);
});
