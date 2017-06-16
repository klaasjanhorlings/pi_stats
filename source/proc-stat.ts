import winston from "winston";
import { promisify } from "util";
import { readFile } from "fs";
import { execFile } from "child_process";

const readFileAsync = promisify(readFile);

export async function readCpuValues() {
    const rawValues = await readFileAsync("/proc/stat", "utf8");
    return processStatOutput(rawValues);
}

export const getDelta = (prev: CpuStats, current: CpuStats): CpuStats => ({
    name:   current.name,
    user:   current.user - prev.user,
    nice:   current.nice - prev.nice,
    system: current.system - prev.system,
    idle:   current.idle - prev.idle,
    iowait: current.iowait - prev.iowait,
    irq:    current.irq - prev.irq,
    softirq: current.softirq - prev.softirq
});

export const getRelative = (stats: CpuStats): CpuStats => {
    const total = stats.user + stats.nice + stats.system + stats.idle
                + stats.iowait + stats.irq + stats.softirq;
    return {
        name: stats.name,
        user: stats.user / total,
        nice: stats.nice / total,
        system: stats.system / total,
        idle: stats.idle / total,
        iowait: stats.iowait / total,
        irq: stats.irq / total,
        softirq: stats.softirq / total,
    };
}

const processStatOutput = (output: string): CpuStats[] => {
    const lines = output.split(/\r|\n|\r\n]/);
    return lines.filter(l => l.startsWith("cpu")).map(l => processCpuLine(l));
};

const processCpuLine = (line: string): CpuStats => {
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
};

interface CpuStats {
    name:   string;
    user:   number;
    nice:   number;
    system: number;
    idle:   number;
    iowait: number;
    irq:    number;
    softirq: number;
}
