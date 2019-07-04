import test from "ava";
import * as td from "./";

test(".unasked", t => {
    const a: td.Teledata<string, number> = td.unasked<string, number>();
    t.is(a, "unasked");
});

test(".loading", t => {
    const a: td.Teledata<string, number> = td.loading<string, number>();
    t.is(a, "loading");
});

test(".success", t => {
    const a: td.Teledata<string, number> = td.success<string, number>(123);
    t.deepEqual(a, ["success", 123]);
});

test(".failure", t => {
    const a: td.Teledata<string, number> = td.failure<string, number>(":(");
    t.deepEqual(a, ["failure", ":("]);
});
