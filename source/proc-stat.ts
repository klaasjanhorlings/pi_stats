import winston from "winston";
import * as util from "util";
import { execFile } from "child_process";

execFile("cat", ["/proc/stat"], (err, stdout, stderr) => {
    if (err) {
        winston.error(`Something went wrong while retrieving /proc/stat information. (Message: ${err})`);
        return;
    }

    console.log(processStatOutput(stdout));
});

const processStatOutput = (output: string) => {
    const lines = output.split(/\r|\n|\r\n]/);
    return lines.filter(l => l.startsWith("cpu")).map(l => processCpuLine(l));
}

const processCpuLine = (line: string) => {
    const words = line.split(/\s+/);
    if (!words[0].startsWith("cpu")) {
        return;
    }

    return {
        name:   words[0],
        user:   parseInt(words[1]),
        nice:   parseInt(words[2]),
        system: parseInt(words[3]),
        idle:   parseInt(words[4]),
        iowait: parseInt(words[5]),
        irq:    parseInt(words[6]),
        softirq: parseInt(words[7])
    };
}
