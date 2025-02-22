import { StatusType } from "./status";
import log, { LogLevel } from "./log";
import config from "./config";

let lastFetchTime = 0;

export default async function update(uid: string, token: string, details?: StatusType) {
    log(LogLevel.Info, `Updating Status.`);

    let body: { activity?: StatusType } = {};

    if (details && details.file.name && details.file.path) {
        body = {
            activity: {
                ...details
            }
        };
    }

    try {
        const data = await fetch(`${config.api_url}/users/${uid}/update`, {
            method: "POST",
            headers: {
                "Authorization": `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((r) => r.json());

        lastFetchTime = Date.now();
        log(LogLevel.Info, `FETCHED: ${JSON.stringify(data)}`);
    }
    catch (e) {
        console.error(e);
        log(LogLevel.Error, `FETCH_ERROR: ${e}`);
    }
}