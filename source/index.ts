import { readCpuValues, getDelta, getRelative } from "./cpu";
import { readCpuTemperature } from "./temperature"
import { readMemInfo } from "./meminfo";

readCpuValues().then(values => console.log(values));
readCpuTemperature().then(values => console.log(values));
readMemInfo().then(values => console.log(values));