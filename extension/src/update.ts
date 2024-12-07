import * as vscode from "vscode";
import { StatusType } from "./status";
import log, { LogLevel } from "./log";
import throttle from "./throttle";

let lastFetchTime = 0;

export default async function update(uid: string, details?: StatusType) {
    throttle(async () => {
        log(LogLevel.Info, `Updating Status.`);

        let body: { uid: string, details?: StatusType } = { uid };

        if (details && details.file.name) {
            body = {
                uid,
                details: {
                    ...details
                }
            };
        }

        try {
            const data = await fetch("https://vscode.snehasish.xyz/api/update", {
                method: "POST",
                headers: {
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
    }, 2000);
    // allow only 1 request every 2 seconds
}