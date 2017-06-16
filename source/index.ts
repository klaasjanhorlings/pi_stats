import { readCpuValues, getDelta, getRelative } from "./proc-stat";

const timeout = (length: number) => (
    new Promise(resolve => {
        setTimeout(() => resolve(), length);
    })
);

var first, second;
readCpuValues().then(values => {
    console.log("recorded first value");
    first = values;
    return timeout(5000);
}).then(() => readCpuValues())
.then(values => {
    console.log("recorded second value");
    second = values;
    const delta = getDelta(first, second);
    const relative = getRelative(delta);
    console.log("delta:");
    console.log(delta);
    console.log("relative:");
    console.log(relative);
})