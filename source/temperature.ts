import { readFile } from "fs";

const tempPath = "/sys/class/thermal/thermal_zone0/temp";

const celcius = (microCelcius: number) => microCelcius * 0.001;
const fahrenheit = (microCelcius: number) => microCelcius * 0.001 * (9/5) + 32;
const kelvin = (microCelcius: number) => microCelcius * 0.001 + 273.15;

export const readCpuTemperature = () => (
    new Promise<Temperature>((resolve, reject) => {
        readFile(tempPath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const microCelcius = parseInt(data.toString());
                const mapped = mapToUnits(microCelcius);
                resolve(mapped);
            }
        })
    })
); 

const mapToUnits = (microCelcius: number): Temperature => ({
    celcius: celcius(microCelcius),
    fahrenheit: fahrenheit(microCelcius),
    kelvin: kelvin(microCelcius)
});

interface Temperature {
    celcius: number;
    fahrenheit: number;
    kelvin: number;
}
