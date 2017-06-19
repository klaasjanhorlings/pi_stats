import log from "./logging";
import { readFile } from "fs";

const memInfoPath = "/proc/meminfo";

export const readMemInfo = () => (
    new Promise<MemoryStats>((resolve, reject) => {
        readFile(memInfoPath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const parsed = processMeminfoOutput(data.toString());
                resolve(parsed);
            }
        })
    })
);

const processMeminfoOutput = (output: string) => {
    const lines = output.split(/\r|\n|\r\n]/);
    const result: Partial<MemoryStats> = {};
    for(let line of lines) {
        console.log(line);
        if (line.startsWith("MemTotal")) {
            result.total = parseInt(line.match(/(\d+)/)[1]);
        } else if (line.startsWith("MemFree")) {
            result.free = parseInt(line.match(/(\d+)/)[1]);
        }
    }
    return <MemoryStats> result;
}

interface MemoryStats {
    total: number;
    free: number;
}
