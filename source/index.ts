import { readCpuValues, getDelta, getRelative } from "./proc-stat";
import { readCpuTemperature } from "./temperature"

readCpuValues().then(values => console.log(values));
readCpuTemperature().then(values => console.log(values));
